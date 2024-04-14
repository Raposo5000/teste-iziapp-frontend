const isValidEmail = (email: string): boolean => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regexEmail.test(email)
}

export default isValidEmail
