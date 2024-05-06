"use client"
import { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          clickFunction={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Add a description
            </label>
            <Textarea
              className='rounded-[8px] border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0'
              onChange={(e) => {
                setValues({ ...values, description: e.target.value })
              }}
            />
          </div>

          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat="MMMM d, yyyy h:mm aa"
              className='w-full rounded-[8px] bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          clickFunction={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied to Clipboard" })
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        clickFunction={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type your invite link here"
        className="text-center"
        buttonText="Join Meeting"
        clickFunction={() => {
          if (!values.link) {
            toast({ title: "Please enter a meeting link" });
            return;
          }
      
          // Regular expression to validate URL format
          const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      
          if (!urlPattern.test(values.link)) {
            toast({ title: "Please enter a valid meeting link" });
            return;
          }
      
          router.push(values.link);
        }}
      >
        <Input 
          placeholder='Meeting Link'
          className='bg-dark-3 border-none rounded-[8px] focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>

    </section>
  )
}

export default MeetingTypeList
