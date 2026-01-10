"use client"

import { FileCode } from "lucide-react"

interface Skill {
  id: string
  name: string
  iconUrl: string | null
  iconUrlDark: string | null
}

interface TechStackLoopProps {
  skills: Skill[]
}

export default function TechStackLoop({ skills }: TechStackLoopProps) {
  // If no skills, don't render anything
  if (!skills || skills.length === 0) return null

  // Filter out skills that don't have icons if desired, but user generaly wants logic for fallback
  // Display all published skills
  
  // Duplicate the skills list 3 times to create a seamless loop even on wide screens
  const loopSkills = [...skills, ...skills, ...skills]

  return (
    <section className="py-12 bg-background overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-4 mb-8">
        <h3 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">
            Powering Next Generation Apps
        </h3>
      </div>
      
      <div className="relative w-full overflow-hidden">
         {/* Gradient Masks for fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {loopSkills.map((skill, index) => (
                <div 
                    key={`${skill.id}-${index}`}
                    className="flex items-center gap-3 px-6 py-3 mx-3 bg-secondary/10 border border-white/5 rounded-full backdrop-blur-sm hover:bg-secondary/20 hover:border-primary/20 transition-all duration-300 group cursor-default"
                >
                    <div className="w-6 h-6 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                        {skill.iconUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                                src={skill.iconUrl} 
                                alt={skill.name}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                           <FileCode className="w-5 h-5 text-muted-foreground" />
                        )}
                    </div>
                    <span className="font-medium text-sm whitespace-nowrap text-muted-foreground group-hover:text-foreground transition-colors">{skill.name}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}
