'use client'
export default function Error({ error }) {
  return (
    <h1>Unexpected Error: {error.message}</h1>
  )
};