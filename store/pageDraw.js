/**
 * @file pageDraw module
 * @author zhangxiao
 */
import axios from 'axios'
import AudioCtr from '@/service/audioCtr.js'

export const state = () => {
    return {
        isPlay : true,
        isIntroduce:false,
        currentTime: 0,
        audioCtr: null,
        drawInfo: {},
        userInfo:{}
    };
};

export const mutations = {
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    setUserInfoId(state, userInfo) {
        state.userInfo.appId = userInfo.appId;
        state.userInfo.openid = userInfo.openid;
    },
    setUserInfoDetail(state, detail) {
        state.userInfo.name = detail.nickname;
        state.userInfo.icon = detail.wxIcon;
    },
    setDrawInfo(state, drawInfo) {
        state.drawInfo = drawInfo;
    },
    setIsPlay(state, isPlay){
        state.isPlay = isPlay;
    },
    setIsIntroduce(state, isIntroduce){
        state.isIntroduce = isIntroduce;
    },
    setCurrentTime(state,time){
        state.currentTime = time;
    },
    setAudioCtr(state, obj){
        state.audioCtr = obj;
    }
};

export const actions = {
    initAudioCtr({ commit }){
        commit('setAudioCtr', new AudioCtr());
    },
    async getDrawInfo ({ commit },params) {
        let rs = await axios.get('/wxb/api/draw/take',params).catch(error => {
            throw '当前抽奖人数过多,请稍后再试'
        });
        if(rs.data.isSuccess){
            commit('setDrawInfo',rs.data.data)
        } else {
            throw  rs.data.data
        }
    },
    async getUserId ({ commit },params) {
        let rs = await axios.get('/wxb/user/getToken',params).catch(error => {
            throw '当前抽奖人数过多,请稍后再试'
        });
        if(rs.data.isSuccess){
            commit('setUserInfoId',rs.data.data)
        } else {
            throw  rs.data.data
        }
    },
    async getUserInfo ({ commit,state },params) {
        let rs = await axios.post('/wxb/user/init',params).catch(error => {
            throw '当前抽奖人数过多,请稍后再试';
        });
        if(rs.data.isSuccess){
            commit('setUserInfoDetail',rs.data.data)
        } else {
            throw  rs.data.data
        }
    },
    async getDrawClass ({ commit }) {
        let rs = await axios.get('/wxb/api/draw/ctgList').catch(error => {
            throw '当前抽奖人数过多,请稍后再试'
        });
        if(!rs.data.isSuccess){
            throw  rs.data.data
        };
        return rs;
    },
    async isSetContacts ({ commit }) {
        let rs = await axios.get('/wxb/api/draw/isSetContacts').catch(error => {
            throw '当前抽奖人数过多,请稍后再试'
        });
        if(!rs.data.isSuccess)  {
            throw  rs.data.data
        };
        return rs;
    },
    async setContacts ({ commit },params) {
        let rs = await axios.post('/wxb/api/draw/setContacts',params).catch(error => {
            throw '当前抽奖人数过多,请稍后再试'
        });
        if(!rs.data.isSuccess) {
            throw  rs.data.data
        };
        return rs;
    },
    async getMusic ({ commit },params) {
        let res;
        let rs = await axios.get('/wxb/api/active/get').catch(error => {
            throw '网络请求错误,稍后再试'
        });
        if(!rs.data.isSuccess) {
            throw  rs.data.data
        }else{
            res = rs.data.data
        };
        return res;
    },
};