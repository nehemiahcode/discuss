import Onboarding from '@/components/common/authentication/onboarding'
import React from 'react'

interface Params {
    params:{
        id:string
    }
}
function onboardingPage({params}:Params) {
  return (
    <div>
        <Onboarding userId={params.id}/>
    </div>
  )
}

export default onboardingPage
