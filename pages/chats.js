import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../context';

import { useRouter } from 'next/router';
// This is for dynamic importing
// The chat components use Quill, maintained by Salesforce
// It doesn't natively support Next.js, so we have to import it like this
import dynamic from 'next/dynamic'

const ChatEngine = dynamic(() => 
  import('react-chat-engine').then((module) => module.ChatEngine)
)

const MessageFormSocial = dynamic(() => 
  import('react-chat-engine').then((module) => module.MessageFormSocial)
)

export default function Chats() {
  const { username, secret } = useContext(Context)
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()

  // NextJS runs in the same project on the client and server side
  // So we need to run a check to see if document exists
  // Because Quill requires the document
  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true)
    }
  })

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) {
      router.push('/')
    }
  })

  if (!showChat) return (
    <div />
  )

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height='calc(100vh - 200px)'
          projectID='f15a3635-59d0-4ea2-ac1d-0db48aaa1954'
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
