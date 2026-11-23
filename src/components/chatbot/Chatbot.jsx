import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiMessageCircle,
  FiSend,
  FiTrash2,
  FiX,
} from 'react-icons/fi'
import { chatLabels, chatTopics } from '../../data/chatbotFaqs'
import { getChatbotReply } from '../../services/chatbotService'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const id = useId()
  const inputRef = useRef(null)
  const triggerRef = useRef(null)
  const logRef = useRef(null)
  const requestRef = useRef(null)
  const busyRef = useRef(false)

  const labels = chatLabels[lang]

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (isOpen && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [messages, isSending, isOpen])

  useEffect(() => {
    return () => requestRef.current?.abort()
  }, [])

  function closeChat() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  function clearChat() {
    requestRef.current?.abort()
    requestRef.current = null
    busyRef.current = false
    setIsSending(false)
    setMessages([])
    setInput('')
    inputRef.current?.focus()
  }

  async function sendMessage(value, topic) {
    const text = value.trim()
    if (!text || text.length > 500 || busyRef.current) return

    const replyLanguage = lang
    const controller = new AbortController()

    requestRef.current = controller
    busyRef.current = true
    setIsSending(true)
    setInput('')

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: 'user',
        text,
        lang: replyLanguage,
      },
    ])

    try {
      const reply = await getChatbotReply({
        message: text,
        topic,
        lang: replyLanguage,
        signal: controller.signal,
      })

      if (controller.signal.aborted) return

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          lang: replyLanguage,
          ...reply,
        },
      ])
    } catch (error) {
      if (controller.signal.aborted || error.name === 'AbortError') return

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          lang: replyLanguage,
          text: chatLabels[replyLanguage].error,
        },
      ])
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null
        busyRef.current = false
        setIsSending(false)
      }
    }
  }

  return (
    <div
      lang={lang}
      className="
        agnitalk-ui fixed bottom-[max(1rem,env(safe-area-inset-bottom))]
        right-4 z-50 w-auto! sm:right-6
      "
    >
      {isOpen && (
        <div
          id={`${id}-panel`}
          role="dialog"
          aria-labelledby={`${id}-title`}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault()
              event.stopPropagation()
              closeChat()
            }
          }}
          className="
            absolute bottom-18 right-0 flex
            h-[min(600px,calc(100dvh-7rem))]
            w-[calc(100vw-2rem)] max-w-[400px] flex-col
            overflow-hidden rounded-2xl border border-slate-200
            bg-white shadow-[0_16px_60px_rgba(0,51,102,0.18)]
            motion-safe:animate-[agniChatEnter_180ms_ease-out]
          "
        >
          <div className="flex items-center gap-3 bg-[#003366] p-4 text-white">
            <FiMessageCircle aria-hidden="true" className="h-6 w-6" />

            <div className="min-w-0 flex-1">
              <h2 id={`${id}-title`} className="text-sm">
                {labels.title}
              </h2>
              <p className="mt-1 text-xs text-blue-100">
                {labels.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              aria-label={lang === 'en' ? 'Switch to Bengali' : 'Switch to English'}
              className="min-h-10 rounded-lg px-2 text-xs hover:bg-white/15"
            >
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>

            <button
              type="button"
              onClick={closeChat}
              aria-label={labels.close}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/15"
            >
              <FiX aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-end border-b border-slate-100 px-3 py-1">
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-xs text-slate-600 hover:bg-red-50 hover:text-red-700"
            >
              <FiTrash2 aria-hidden="true" />
              {labels.clear}
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-label={lang === 'bn' ? 'কথোপকথন' : 'Conversation'}
            aria-live="polite"
            aria-relevant="additions"
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#F8FAFC] p-4"
          >
            <p className="text-sm leading-6 text-slate-600">
              {labels.welcome}
            </p>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  lang={message.lang}
                  className={`
                    max-w-[92%] rounded-2xl px-3.5 py-3
                    ${
                      message.role === 'user'
                        ? 'bg-[#0052CC] text-white'
                        : 'border border-slate-200 bg-white text-slate-700'
                    }
                  `}
                >
                  <span className="sr-only">
                    {message.role === 'user'
                      ? message.lang === 'bn' ? 'আপনি: ' : 'You: '
                      : message.lang === 'bn' ? 'সহকারী: ' : 'Assistant: '}
                  </span>

                  <p className="whitespace-pre-wrap break-words text-sm leading-6">
                    {message.text}
                  </p>

                  {message.link && (
                    <Link
                      to={message.link.to}
                      onClick={closeChat}
                      className="mt-3 inline-block text-sm text-[#0052CC] underline underline-offset-4"
                    >
                      {message.link.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {isSending && (
              <p role="status" className="text-xs text-slate-500">
                {labels.loading}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-3 py-2">
            {chatTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                disabled={isSending}
                onClick={() => sendMessage(topic[lang], topic.id)}
                className="
                  rounded-lg border border-blue-100 bg-blue-50
                  px-3 py-2 text-xs text-[#003366]
                  hover:bg-blue-100 disabled:opacity-50
                "
              >
                {topic[lang]}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage(input)
            }}
            className="flex gap-2 border-t border-slate-200 p-3"
          >
            <label htmlFor={`${id}-input`} className="sr-only">
              {labels.placeholder}
            </label>

            <input
              id={`${id}-input`}
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder={labels.placeholder}
              className="
                min-w-0 flex-1 rounded-xl border border-slate-200
                bg-slate-50 px-3 py-3 text-base text-slate-800
                outline-none focus:border-blue-400
                focus:ring-2 focus:ring-blue-100 sm:text-sm
              "
            />

            <button
              type="submit"
              disabled={isSending || !input.trim()}
              aria-label={labels.send}
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-xl bg-[#0052CC] text-white hover:bg-[#003366]
                disabled:cursor-not-allowed disabled:opacity-40
              "
            >
              <FiSend aria-hidden="true" className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => isOpen ? closeChat() : setIsOpen(true)}
        aria-label={isOpen ? labels.close : labels.open}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        aria-haspopup="dialog"
        className="
          flex h-14 w-14 items-center justify-center rounded-full
          bg-[#0052CC] text-white shadow-lg
          transition-colors hover:bg-[#003366]
          motion-reduce:transition-none
        "
      >
        {isOpen ? (
          <FiX aria-hidden="true" className="h-6 w-6" />
        ) : (
          <FiMessageCircle aria-hidden="true" className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}