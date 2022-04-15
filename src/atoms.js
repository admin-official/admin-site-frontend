import { atom } from 'recoil';

export const userIdState = atom({
    key: 'userId',
    default: {
        userId: '',
        email: '',
        phoneNumber: '',
        name: '',
        studentNumber: '',
    },
});

export const modalVisibleState = atom({
    key: 'modalVisible',
    default: false,
});

export const fileUploadModalVisibleState = atom({
    key: 'fileUploadModalVisible',
    default: false,
});

export const announcementTabIndexState = atom({
    key: 'announcementTabIndex',
    default: 0,
});
