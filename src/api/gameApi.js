import api from './axiosConfig';

export const startGame = async (settings) => {
    const response = await api.post('/api/start', {
        gameMode: settings.gameMode,
        userColour: settings.userColour
    });

    return response.data;
};