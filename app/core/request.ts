import * as re from 'request';

export default function re_promise(options: re.UriOptions & re.CoreOptions): Promise<re.Response> {
  return new Promise((resolve, reject) => {
    re(options, function (error, response) {
      if (error) reject(error);
      resolve(response);
    })
  })
}

