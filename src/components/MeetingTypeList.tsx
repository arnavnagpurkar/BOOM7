"use client"
import { useState } from 'react'
import HomeCard from './HomeCard'
import Link from 'next/link'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

  const createMeeting = () => {
    
  }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      {/* New Meeting Card */}
      <HomeCard
        bgcolor='bg-orange-1'
        image='/icons/add-meeting.svg'
        title='New Meeting'
        description="Start an instant meeting"
        clickFunction={() => setMeetingState('isInstantMeeting')}
      />

      {/* Join Meeting Card */}
      <HomeCard
        bgcolor='bg-blue-1'
        image='/icons/join-meeting.svg'
        title='Join Meeting'
        description="via invitation link"
        clickFunction={() => setMeetingState('isJoiningMeeting')}
      />

      {/* Schedule Meeting Card */}
      <HomeCard
        bgcolor='bg-purple-1'
        image='/icons/schedule.svg'
        title='Schedule Meeting'
        description="plan your meeting"
        clickFunction={() => setMeetingState('isScheduleMeeting')}
      />

      {/* View Recordings Card */}
      <Link href="/recordings">
        <HomeCard
          bgcolor='bg-yellow-1'
          image='/icons/Video.svg'
          title='View Recordings'
          description="Meeting Recordings"
        />
      </Link>

      <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        clickFunction={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
