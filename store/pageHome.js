export const state = () => {
    return {
        showFooterTree: true,
        templePosition: '8.85rem',
        animationIn:'animated fadedispaly duration-1000'
    };
};

export const mutations = {
    setFooterTreeState(state, isShow) {
        state.showFooterTree = isShow;
    },
    setTemplePosition(state, pos) {
        state.templePosition = pos;
    },
    setEnterAnimation(state , animate){
        state.animationIn = animate;
    },
    resetEnterAnimation(state){
        state.animationIn = 'animated fadedispaly duration-1000';
    }
};
