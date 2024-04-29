"use client"
import Image from 'next/image'
import React from 'react'
import HomeCard from './HomeCard'

const MeetingTypeList = () => {
    return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>

      {/* New Meeting Card */}
      <HomeCard
        bgcolor='bg-orange-1'
        image='/icons/add-meeting.svg'
        title='New Meeting'
        description="Start an instant meeting"
      />

      {/* Join Meeting Card */}
      <HomeCard
        bgcolor='bg-blue-1'
        image='/icons/join-meeting.svg'
        title='Join Meeting'
        description="via invitation link"
      />

      {/* Schedule Meeting Card */}
      <HomeCard
        bgcolor='bg-purple-1'
        image='/icons/schedule.svg'
        title='Schedule Meeting'
        description="plan your meeting"
      />

      {/* View Recordings Card */}
      <HomeCard
        bgcolor='bg-yellow-1'
        image='/icons/Video.svg'
        title='View Recordings'
        description="Meeting Recordings"
      />

    </section>
  )
}

export default MeetingTypeList
