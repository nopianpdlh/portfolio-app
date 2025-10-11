'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Briefcase, 
  Code, 
  Coffee, 
  FolderGit2,
  Sparkles
} from 'lucide-react'

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
      icon: CheckCircle,
      text: 'Available for Work',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    busy: {
      icon: Clock,
      text: 'Currently Busy',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    unavailable: {
      icon: XCircle,
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
      icon: FolderGit2,
      label: 'Projects Completed',
      value: stats.projectsCount.toString(),
      color: 'text-blue-500',
    },
    {
      icon: Briefcase,
      label: 'Years Experience',
      value: stats.yearsExperience.toString(),
      color: 'text-purple-500',
    },
    {
      icon: Code,
      label: 'Technologies',
      value: stats.technologiesCount.toString(),
      color: 'text-cyan-500',
    },
    {
      icon: Coffee,
      label: 'Coffee Consumed',
      value: '∞',
      color: 'text-amber-500',
    },
  ]

  // Merge with custom stats if provided
  const allStats = stats.customStats && stats.customStats.length > 0
    ? [
        ...defaultStats.slice(0, 3),
        ...stats.customStats.slice(0, 3).map((stat) => ({
          icon: Sparkles,
          label: stat.label,
          value: stat.value,
          color: 'text-pink-500',
        })),
      ]
    : defaultStats

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Availability Status */}
          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl border ${currentStatus.borderColor} ${currentStatus.bgColor} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3">
              <StatusIcon className={`w-6 h-6 ${currentStatus.color}`} />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className={`font-semibold ${currentStatus.color}`}>
                  {currentStatus.text}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Activity */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Current Activity</p>
                <p className="font-semibold text-foreground">
                  {currentActivity}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Open to Opportunities */}
          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl border ${
              openToOpportunities
                ? 'border-green-500/20 bg-green-500/10'
                : 'border-border/50 bg-card/50'
            } backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3">
              <Briefcase
                className={`w-6 h-6 ${
                  openToOpportunities ? 'text-green-500' : 'text-muted-foreground'
                }`}
              />
              <div>
                <p className="text-sm text-muted-foreground">Opportunities</p>
                <p
                  className={`font-semibold ${
                    openToOpportunities ? 'text-green-500' : 'text-foreground'
                  }`}
                >
                  {openToOpportunities ? 'Open to Work' : 'Not Accepting'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Grid */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-center">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allStats.map((stat, index) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow"
                >
                  <StatIcon className={`w-8 h-8 ${stat.color} mb-3`} />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
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
