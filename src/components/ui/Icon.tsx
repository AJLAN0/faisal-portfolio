import {
  Aperture,
  Award,
  Calendar,
  Camera,
  Clapperboard,
  Eye,
  Film,
  Flame,
  Gem,
  Landmark,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Mic,
  MonitorPlay,
  PenTool,
  Phone,
  Send,
  Share2,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

/**
 * String-keyed icon map so the content data file stays pure data
 * (no JSX / component imports). Add a new key here, then reference it
 * by string in src/data/siteContent.ts.
 */
const icons = {
  aperture: Aperture,
  award: Award,
  calendar: Calendar,
  camera: Camera,
  clapper: Clapperboard,
  eye: Eye,
  film: Film,
  flame: Flame,
  gem: Gem,
  landmark: Landmark,
  layers: Layers,
  lightbulb: Lightbulb,
  mail: Mail,
  pin: MapPin,
  megaphone: Megaphone,
  whatsapp: MessageCircle,
  mic: Mic,
  monitor: MonitorPlay,
  pen: PenTool,
  phone: Phone,
  send: Send,
  share: Share2,
  sparkles: Sparkles,
  star: Star,
  target: Target,
  trending: TrendingUp,
  users: Users,
}

export type IconName = keyof typeof icons

interface IconProps {
  name: IconName
  className?: string
  strokeWidth?: number
}

export function Icon({ name, className, strokeWidth = 1.6 }: IconProps) {
  const Cmp = icons[name]
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
