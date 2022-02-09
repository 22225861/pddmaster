import {HOME_CASUAL, HOME_NAV, HOME_Shop_List,Recommend_Shop_List} from "@/store/mutation-types";


export default {
    [HOME_CASUAL](state,{homecasual}){
        state.homecasual=homecasual
    },
    [HOME_NAV](state,{homenav}){
        state.homenav=homenav
    },
    [HOME_Shop_List](state,{homeshoplist}){
        state.homeshoplist=homeshoplist
    },
    [Recommend_Shop_List](state,{recommendshoplist}){
        state.recommendshoplist=recommendshoplist
    },
}