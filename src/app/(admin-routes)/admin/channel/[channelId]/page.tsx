
import React from 'react'
import CityForm from '../new/page'
import ChannelForm from '../new/page'

export default function ChannelDetail({ params }: any) {
  return (
    <ChannelForm channelId={params.channelId}/>
  )
}
