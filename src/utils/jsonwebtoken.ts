import { sign, verify } from 'jsonwebtoken'

export function signJWT(payload: object, secretKey: string, options: object) {
  return sign({ payload }, secretKey, options)
}

export function verifyJWT(token: string, secretKey: string, options: object) {
  return verify(token, secretKey, options, function (error, decode) {
    if (error) {
      console.log(error)
      return false
    }

    return decode
  })
}
