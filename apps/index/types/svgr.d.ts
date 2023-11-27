declare module '*.svg' {
  const _: React.FC<React.SVGProps<HTMLOrSVGElement> & {title?: string}>
  export = _
}
