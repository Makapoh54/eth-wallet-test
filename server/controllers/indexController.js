import * as path from 'path';

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
};

export default index;
