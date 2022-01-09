const homeTemplate = (data = '') => `<!doctype html>
<textarea style="width:800px;height:800px;">${JSON.stringify(data, null, 2)}</textarea>
`;

export default homeTemplate;
