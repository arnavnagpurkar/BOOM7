"use client"
import { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({ title: "Meeting created" });

    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create meeting" });
    }
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
      <HomeCard
        bgcolor='bg-yellow-1'
        image='/icons/Video.svg'
        title='View Recordings'
        description="Meeting Recordings"
        clickFunction={() => router.push('/recordings')}
      />

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
