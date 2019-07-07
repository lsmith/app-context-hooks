export const container = Object.create(null);

export const configure = (apis) => {
    Object.assign(container, apis);
};
