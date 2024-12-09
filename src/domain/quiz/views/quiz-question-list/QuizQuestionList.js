import useSWR from 'swr'

import Image from '@/components/Image'
import Avatar from '@/components/Avatar'
import BrandLogo from '@/components/brand-logo'

import { fetcher } from '@/utils/request'

import QuizLimiterWidget from '../../widgets/quiz-limiter'

import quizEco from './quiz-eco.png'
import { QuizComponents } from './QuizComponents'

function QuizCreator({ creator }) {
  return (
    <>
      <Avatar className="mr-2" size={28} alt={creator.user_nick_name} src={creator.user_avatar} />
      <p className="opacity-90">By <a href={`/u/${creator.user_handle}`}><strong>{creator.user_nick_name}</strong></a></p>
    </>
  )
}

function QuizQuestionListView({ id }) {
  const { data } = useSWR(`/ts/v1/quiz/${id}/info`, fetcher)
  const { data:quizIndex } = useSWR(`/ts/v1/quiz/${id}/index`, fetcher)

  return (
    <QuizLimiterWidget id={id} type={quizIndex?.limit?.limit_type} check={!!quizIndex}>
      <div className="min-h-screen bg-gray text-white flex">
        <div className="max-w-[520px] px-14 py-9 flex flex-col justify-between">
          <div>
            <BrandLogo className="h-9" />
            <div className="mt-14 mb-6 flex items-center">
              {data?.quiz_user && <QuizCreator creator={data?.quiz_user} />}
            </div>
            <h4>{data?.title}</h4>
          </div>
          <Image src="" defaultSrc={quizEco} alt="" />
        </div>
        <div className="bg-white text-gray flex-1 px-14 py-10 relative">
          <QuizComponents id={id} data={data} />
        </div>
      </div>
    </QuizLimiterWidget>
  )
}

export default QuizQuestionListView