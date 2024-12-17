import { HomeArticles } from "./HomeArticles"
import { HomeTopics } from "./HomeTopics"
import { HomeWelcome } from "./HomeWelcome"


export const HomePage = () => {


    return (
       <div>
        <HomeWelcome/>
        <HomeTopics/>
        <HomeArticles/>
       </div>
    )
}