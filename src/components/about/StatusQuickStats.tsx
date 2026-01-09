'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { 
  Tick02Icon, 
  Time04Icon, 
  Cancel01Icon, 
  Folder01Icon, 
  WorkHistoryIcon, 
  CodeCircleIcon, 
  Coffee01Icon,
  SparklesIcon,
  Briefcase02Icon
} from '@hugeicons/core-free-icons'

interface StatusQuickStatsProps {
  availabilityStatus: string
  currentActivity: string
  openToOpportunities: boolean
  stats: {
    projectsCount: number
    yearsExperience: number
    technologiesCount: number
    customStats?: Array<{
      label: string
      value: string
    }>
  }
}

const StatusQuickStats: React.FC<StatusQuickStatsProps> = ({
  availabilityStatus,
  currentActivity,
  openToOpportunities,
  stats,
}) => {
  // Status badge configuration
  const statusConfig = {
    available: {
      icon: Tick02Icon,
      text: 'Available for Work',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    busy: {
      icon: Time04Icon,
      text: 'Currently Busy',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    unavailable: {
      icon: Cancel01Icon,
      text: 'Not Available',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
  }

  const currentStatus = statusConfig[availabilityStatus as keyof typeof statusConfig] || statusConfig.available
  const StatusIcon = currentStatus.icon

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  // Default stats
  const defaultStats = [
    {
      icon: Folder01Icon,
      label: 'Projects Completed',
      value: stats.projectsCount.toString(),
      color: 'text-primary',
    },
    {
      icon: WorkHistoryIcon,
      label: 'Years Experience',
      value: stats.yearsExperience.toString(),
      color: 'text-primary',
    },
    {
      icon: CodeCircleIcon,
      label: 'Technologies',
      value: stats.technologiesCount.toString(),
      color: 'text-primary',
    },
    {
      icon: Coffee01Icon,
      label: 'Coffee Consumed',
      value: '∞',
      color: 'text-primary',
    },
  ]

  // Merge with custom stats if provided
  const allStats = stats.customStats && stats.customStats.length > 0
    ? [
        ...defaultStats.slice(0, 3),
        ...stats.customStats.slice(0, 3).map((stat) => ({
          icon: SparklesIcon,
          label: stat.label,
          value: stat.value,
          color: 'text-primary',
        })),
      ]
    : defaultStats

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="py-12 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Availability Status */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${currentStatus.bgColor}`}>
                <HugeiconsIcon icon={StatusIcon} size={24} className={currentStatus.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                <p className={`font-bold ${currentStatus.color}`}>
                  {currentStatus.text}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Activity */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <HugeiconsIcon icon={CodeCircleIcon} size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Current Activity</p>
                <p className="font-bold text-foreground">
                  {currentActivity}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Open to Opportunities */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${openToOpportunities ? 'bg-green-500/10' : 'bg-muted'}`}>
                <HugeiconsIcon 
                  icon={Briefcase02Icon} 
                  size={24} 
                  className={openToOpportunities ? 'text-green-500' : 'text-muted-foreground'} 
                />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Opportunities</p>
                <p className={`font-bold ${openToOpportunities ? 'text-green-500' : 'text-foreground'}`}>
                  {openToOpportunities ? 'Open to Work' : 'Not Accepting'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allStats.map((stat, index) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all text-center group"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-primary/5 text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                    <HugeiconsIcon icon={StatIcon} size={32} />
                  </div>
                  <p className="text-4xl font-bold mb-2 tracking-tight">{stat.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default StatusQuickStats
