import Image from "next/image"

export const Logo = () => {
  return (
    <>
      <h1>
        <Image
          src="/images/logo.png"
          alt="Weather Wear"
          priority={true}
          width={197}
          height={56}
        />
      </h1>
    </>
  )
}
