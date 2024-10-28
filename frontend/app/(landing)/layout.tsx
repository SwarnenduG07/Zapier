
const LandingLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <main >
          <div className="h-screen bg-black ">
              {children} 
          </div>
      </main>
    )
}
export default LandingLayout