import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, ExternalLink, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Hardware and software projects in chip design, FPGA, and computer architecture.',
  openGraph: {
    title: 'Projects — Kai Weng',
    description: 'Hardware and software projects in chip design, FPGA, and computer architecture.',
  },
};

interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  status: 'active' | 'completed' | 'archived';
  details: string[];
}

const projects: ProjectData[] = [
  {
    title: 'RISC-V Out-of-Order Core',
    description:
      'A parameterized out-of-order RISC-V processor core with 6-wide issue, branch prediction, and non-blocking L1 cache.',
    tech: ['SystemVerilog', 'RISC-V', 'VCS', 'Verdi', 'Python'],
    github: 'https://github.com/kaiweng/riscv-o3-core',
    status: 'active',
    details: [
      '6-wide superscalar out-of-order execution',
      'TAGE branch predictor with 95%+ accuracy',
      'Non-blocking L1 data cache with MSHRs',
      'Verified with riscv-dv random instruction generator',
      'Synthesized at 1.2 GHz on 28nm process',
    ],
  },
  {
    title: 'NPU Performance Simulator',
    description:
      'Cycle-accurate simulator for systolic-array based NPU architectures, supporting various dataflows and memory hierarchies.',
    tech: ['C++', 'Python', 'SystemC', 'NumPy'],
    github: 'https://github.com/kaiweng/npu-sim',
    status: 'active',
    details: [
      'Configurable array size (16x16 to 128x128)',
      'Weight-stationary and output-stationary dataflows',
      'Multi-level memory hierarchy modeling',
      'DRAM bandwidth bottleneck analysis',
      'Integrated with PyTorch for workload traces',
    ],
  },
  {
    title: 'FPGA-Based Radar Signal Processor',
    description:
      'Real-time FMCW radar signal processing pipeline on Xilinx Zynq, including FFT, CFAR detection, and angle estimation.',
    tech: ['Verilog', 'Vivado', 'Zynq', 'MATLAB', 'C'],
    github: 'https://github.com/kaiweng/radar-fpga',
    status: 'completed',
    details: [
      '1024-point FFT pipeline with 4-cycle throughput',
      '2D CFAR detector with configurable guard cells',
      'MUSIC algorithm for angle-of-arrival estimation',
      'AXI-Stream interface for data movement',
      'Real-time processing at 100 MSPS',
    ],
  },
  {
    title: 'Cache Coherence Verification Framework',
    description:
      'Formal verification framework for cache coherence protocols using SystemVerilog Assertions and JasperGold.',
    tech: ['SystemVerilog', 'SVA', 'JasperGold', 'Python'],
    github: 'https://github.com/kaiweng/coherence-fv',
    status: 'completed',
    details: [
      'Support for MSI, MESI, and MOESI protocols',
      'Automated litmus test generation',
      'Coverage-driven verification methodology',
      'Integration with tilelink/ACE interfaces',
      'Reported and fixed 3 protocol-level bugs',
    ],
  },
  {
    title: 'LLVM Backend for Custom AI Accelerator',
    description:
      'Custom LLVM backend for a proprietary AI accelerator ISA, including instruction selection, scheduling, and code generation.',
    tech: ['C++', 'LLVM', 'MLIR', 'Python'],
    github: 'https://github.com/kaiweng/ai-llvm-backend',
    status: 'active',
    details: [
      'Custom ISA with vector and matrix extensions',
      'TableGen-based instruction definitions',
      'MLIR dialect for high-level operations',
      'Loop tiling and fusion optimizations',
      'Achieved 78% of peak theoretical throughput',
    ],
  },
  {
    title: 'Open-Source AMBA Testbench',
    description:
      'Comprehensive UVM-based testbench for AMBA AXI4/AHB protocols with scoreboarding and coverage collection.',
    tech: ['SystemVerilog', 'UVM', 'AXI', 'AHB'],
    github: 'https://github.com/kaiweng/amba-tb',
    status: 'archived',
    details: [
      'AXI4, AXI4-Lite, and AHB-lite VIP components',
      'Constrained-random transaction generation',
      'Functional coverage model with 100% coverage target',
      'Reusable agent architecture',
      'Open-source under MIT license',
    ],
  },
];

const statusColors = {
  active: 'bg-green-500/10 text-green-500 border-green-500/20',
  completed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  archived: 'bg-muted text-muted-foreground border-border',
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20 animate-fade-in">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-muted-foreground leading-relaxed">
          Open-source and research projects in chip design, computer architecture,
          and hardware engineering. Most are open-source and under active development.
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="p-6 hover:border-foreground/10 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <ul className="space-y-1.5 mb-4">
                  {project.details.map((detail) => (
                    <li key={detail} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Layers className="h-3.5 w-3.5 mt-0.5 text-foreground/30 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="font-mono text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 md:flex-col shrink-0">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-3.5 w-3.5" /> Source
                    </Button>
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-3.5 w-3.5" /> Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
