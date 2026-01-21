import { Feature1 } from "./feature"


export const About = () => {
	return (
		<>
			<div className="text-2xl text-(--color4) font-bold" > About Us</div>

			<div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] w-full px-4" >

				<div className='relative overflow-hidden p-4 text-justify text-lg' >
					We are dedicated to making quality care accessible, reliable, and compassionate for every family. Our platform connects individuals with trained and trusted caregivers who provide professional nursing, elderly care, and babysitting services—right at your doorstep.

					We understand that caring for a loved one is deeply personal. That’s why we focus not only on skills and experience, but also on empathy, responsibility, and respect. Every caregiver on our platform goes through a careful screening process to ensure safety, professionalism, and peace of mind for families.

					Whether you need short-term assistance, long-term nursing support, or a caring babysitter you can trust, we make the process simple and transparent. From easy booking to flexible scheduling, our goal is to remove stress and help you focus on what truly matters—your loved ones.

					Driven by technology and guided by compassion, we aim to raise the standard of home care services. We believe everyone deserves dignity, comfort, and attentive care, regardless of age or condition.

					With us, you’re not just hiring a service—you’re choosing care you can trust.
				</div>

				<Feature1 />

			</div>


		</>
	)
}