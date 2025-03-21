import React, { useEffect, useState } from 'react';
import { Cpu, Memory, HardDrive, Monitor, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SystemSpecs {
  cpu: {
    cores: number;
    model: string;
  };
  memory: {
    total: number; // in GB
  };
  gpu: {
    model: string;
    memory?: number; // in GB
  };
  storage: {
    free: number; // in GB
  };
}

export function SystemRequirementsChecker() {
  const [specs, setSpecs] = useState<SystemSpecs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkSystemSpecs() {
      try {
        // Check if browser supports required APIs
        if (!navigator.hardwareConcurrency) {
          throw new Error('Your browser does not support system requirements checking');
        }

        // Get CPU info
        const cpuCores = navigator.hardwareConcurrency;

        // Get memory info
        const memory = (navigator as any).deviceMemory || 'Unknown';

        // Get GPU info using WebGL
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const gpuInfo = gl ? {
          model: (gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL) || 'Unknown'),
          vendor: (gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_VENDOR_WEBGL) || 'Unknown')
        } : { model: 'Unknown', vendor: 'Unknown' };

        // Get storage info
        const storage = await navigator.storage.estimate();
        const freeSpace = storage.quota ? Math.floor(storage.quota / (1024 * 1024 * 1024)) : 'Unknown';

        setSpecs({
          cpu: {
            cores: cpuCores,
            model: 'Detection Limited in Browser'
          },
          memory: {
            total: typeof memory === 'number' ? memory : 0
          },
          gpu: {
            model: gpuInfo.model,
            memory: undefined // Browser API limitation
          },
          storage: {
            free: typeof freeSpace === 'number' ? freeSpace : 0
          }
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to check system requirements');
      } finally {
        setLoading(false);
      }
    }

    checkSystemSpecs();
  }, []);

  const getRequirementStatus = (type: string) => {
    if (!specs) return { meets: false, icon: XCircle, message: 'Unable to detect' };

    switch (type) {
      case 'cpu':
        return {
          meets: specs.cpu.cores >= 4,
          icon: specs.cpu.cores >= 4 ? CheckCircle : XCircle,
          message: `${specs.cpu.cores} cores detected (4+ recommended)`
        };
      case 'memory':
        return {
          meets: specs.memory.total >= 8,
          icon: specs.memory.total >= 8 ? CheckCircle : XCircle,
          message: `${specs.memory.total}GB detected (8GB+ recommended)`
        };
      case 'gpu':
        return {
          meets: specs.gpu.model !== 'Unknown',
          icon: specs.gpu.model !== 'Unknown' ? CheckCircle : XCircle,
          message: specs.gpu.model
        };
      default:
        return { meets: false, icon: XCircle, message: 'Unknown' };
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-20 bg-[#1c2128] rounded-lg" />
        <div className="h-20 bg-[#1c2128] rounded-lg" />
        <div className="h-20 bg-[#1c2128] rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-900 rounded-lg">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-400 hover:text-red-300"
        >
          Retry Check
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161b22] border border-[#30363d] rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Monitor className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Your System Specifications</h2>
      </div>

      <div className="grid gap-4">
        {Object.entries(getRequirementStatus('cpu')).length > 0 && (
          <div className="flex items-center gap-4 p-4 bg-[#1c2128] rounded-lg">
            <Cpu className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-[#8b949e]">CPU</p>
              <p className="text-white">{specs?.cpu.model}</p>
              <p className="text-sm text-[#8b949e]">{getRequirementStatus('cpu').message}</p>
            </div>
            <div className="ml-auto">
              {React.createElement(getRequirementStatus('cpu').icon, {
                className: `w-5 h-5 ${getRequirementStatus('cpu').meets ? 'text-green-400' : 'text-yellow-400'}`
              })}
            </div>
          </div>
        )}

        {/* Similar blocks for Memory and GPU */}
        {/* ... */}

        <div className="mt-4 p-4 bg-[#1c2128] rounded-lg border border-[#30363d]/50">
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            <p>
              Note: Browser-based system detection is limited. For accurate requirements checking,
              download our system checker tool or check your system specifications manually.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
