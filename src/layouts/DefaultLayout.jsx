import topDecor from '../assets/images/bg-stars.svg'
import bottomDecor from '../assets/images/pattern-hills.svg'

export default function DefaultLayout({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-[#1f1d2a] text-white overflow-hidden">
      <img src={topDecor} className="absolute top-0 left-0" />
      <img src={bottomDecor} className="absolute bottom-0 right-0 opacity-40" />
      <main className="relative z-10">{children}</main>
    </div>
  )
}
