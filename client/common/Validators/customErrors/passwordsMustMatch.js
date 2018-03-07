export default function (error) {
  const { dataPath, keyword } = error
  if (keyword === 'const' && dataPath === '/confirmPassword') {
    return 'debe coincidir con la contraseña'
  }
  return undefined
}
