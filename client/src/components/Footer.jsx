
const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-12">
        <div className="text-center py-3">
            <p>The Spot &copy;{currentYear}</p>
        </div>
    </footer>
  )
}
export default Footer