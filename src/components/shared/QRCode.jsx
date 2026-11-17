// The real AgniTalk download QR (cropped from the printed banner). It opens the campaign link.
export default function QRCode({ size = 112, caption = 'Scan to Download', className = '' }) {
  return (
    <div className={`inline-block rounded-xl bg-white p-3 shadow-md ${className}`}>
      <img
        src="/images/agnitalk-qr.png"
        alt="QR code to download AgniTalk"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        draggable={false}
      />
      {caption && <p className="mt-1 text-center text-xs text-gray-500">{caption}</p>}
    </div>
  )
}
