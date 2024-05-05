"use client"
import React from 'react'
import useGetCalls from '@/hooks/useGetCalls';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()

  return (
    <div>

    </div>
  )
}

export default CallList
