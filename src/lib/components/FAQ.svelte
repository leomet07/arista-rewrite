<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
</script>

<Accordion class="card p-4 justify-center">
	<div class="w-full flex justify-around">
		<span class="block chip variant-filled-secondary h4">Frequentely Asked Questions</span>
	</div>

	<h2 class="h2 text-center">You ask. ARISTA answers.</h2>
	<AccordionItem open={!$currentUser}>
		<svelte:fragment slot="summary">
			<h3 class="h3">What is ARISTA?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<section class=" w-full text-token space-y-4">
				<p>
					ARISTA is Stuyvesant High School’s premier honor society. We strive to become positive
					role models as we proudly serve our communities by upholding our four pillars of
					character, leadership, scholarship, and service. Not only are our handpicked members—some
					of the most diligent and morally upright students within Stuyvesant—the backbone of the
					academic support system within Stuyvesant, but we are also a coveted volunteer force that
					positively permeates the greater New York City community.
				</p>
				<p>
					Despite the sometimes overwhelming amount of obligations and commitments our members have,
					we, high school students, are perhaps one of the most reliable volunteer groups in the
					country—not because we have more time than anyone else, but because we make time for the
					causes we care about.
				</p>
				<p>
					We are excited to see our momentum carry on to future permutations of ARISTA; despite a
					different makeup of members and different leadership, our values as a society persist
					across time, with each year expanding on ARISTA’s mission and allowing it to create even
					more positive change within our school and the world.
				</p>
				<blockquote class="blockquote">
					“I have learned, over time, to enjoy helping others and to gain a sense of pride and
					fulfillment from it, and I hope that you learn to develop this muscle over the coming
					years. Our responsibilities can often feel onerous, burdensome, and tiresome. We may not
					want to do them, and there are other things we could be doing with our time, and so on.
					But that moment when we help someone out—when we know we’ve made someone else's day just a
					little easier—that's a beautiful feeling. With every act of service you perform, I hope
					you take a moment afterwards to reflect, briefly, on how good it feels to help someone
					else.” <br /> -Eric Ferencz, Faculty Advisor
				</blockquote>
				<p>Here are the pillars we strive to uphold:</p>
				<p class="font-bold">Character</p>
				<blockquote class="blockquote">
					"Character encompasses a person's inner qualities, principles, and the way they interact
					with others and the world around them. Because ARISTA members strive to be role models,
					the Stuyvesant—as well as the New York City—community trusts them." <br />-Lenny Metlitsky
					‘25
				</blockquote>
				<p class="font-bold">Leadership</p>
				<blockquote class="blockquote">
					ARISTA members are leaders of their communities, whether within Stuyvesant, their
					neighborhood, or among family and friends. Each ARISTA member has demonstrated the ability
					to plan and to execute. More than just the ability to lead a group of people, to be a
					leader is to be a listener. Leaders are empathetic and caring, and as our members enter
					communities both within and outside Stuyvesant, they treat everyone they meet with
					respect. <br />-Ayla Irshad ‘25
				</blockquote>
				<p class="font-bold">Scholarship</p>
				<blockquote class="blockquote">
					Our members here at ARISTA excel academically, constantly pushing themselves. But
					scholarship goes beyond simply academic achievement: at its core, it is about the love of
					learning—the desire to explore the world around us, to ask questions, to challenge
					assumptions. So many around the world lack the educational opportunities that are
					available to us here at Stuyvesant. Our members optimize the opportunities they receive
					and seek knowledge both in academic settings and beyond, while recognizing that many do
					not have access to this privilege. It is our hope that our students harness their
					knowledge to create meaningful change, as knowledge is a powerful tool for transformation,
					and we hope that they take this love of learning and this perpetual pursuit of excellence
					along with them even after they leave Stuyvesant and embark on their journeys in college
					and beyond. <br />-Tamiyyah Shafiq ‘25
				</blockquote>
				<p class="font-bold">Service</p>
				<blockquote class="blockquote">
					Service is about giving back to the communities that support us. It embodies the spirit of
					selflessness and the drive to make a positive difference. Our members embrace this pillar
					and engage in meaningful ways, both in Stuyvesant and the greater New York City community.
					By committing to service, we not only uplift those around us but also grow as individuals,
					cultivating the values of kindness and collaboration that will guide us throughout our
					lives.
					<br />-Alexa Chiang ‘25
				</blockquote>
			</section>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What are the services ARISTA offers?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<section class="w-full text-token space-y-4">
				<div>
					<h4 class="h4">In-House Academic Support</h4>
					<ul class="mt-1 list-disc list-inside [&_ul]:list-[revert]">
						<li>
							<span class="font-bold underline">Peer Tutoring:</span> ARISTA offers Stuyvesant
							students one-on-one peer tutoring with a member skilled in the requested subject. Once
							paired through our website, a session is self-coordinated between the tutor and tutee
							to ensure utmost flexibility. Thus, sessions can occur anywhere and at any time:
							before school, during free periods, after school, during the weekend, and even
							virtually. Request a tutor here:
							<a class="anchor" href="/tutoring">stuyarista.org/tutoring</a>.
						</li>
						<li>
							<span class="font-bold underline">Study Guides:</span> Our database of study guides
							ranges across all subjects and grades and is the accumulation of a procured collection
							of guides submitted by our academically stellar members over the past few years. The
							database has study guides of various formats, including Quizlets, Kahoots, Google
							Docs, Notion, and more; we have been making an effort in recent years to include a
							greater variety to ensure we are supporting students of all learning types. Find our
							database at this link:
							<a class="anchor" href="/studyguides">stuyarista.org/studyguides</a>.
						</li>
						<li>
							<span class="font-bold underline">AIS:</span> ARISTA members also assist various
							teacher-led AIS sessions, coordinated by Dr. Haber. Find the AIS schedule
							<a
								class="anchor"
								href="https://stuy.enschool.org/apps/pages/index.jsp?uREC_ID=507777&type=d">here</a
							>.
						</li>
						<li>
							<span class="font-bold underline">Long-term Partnerships:</span> We have established
							long-term partnerships with several organizations within Stuyvesant such as with the
							<a href="http://wc.stuy.edu" class="anchor">Writing Center</a>
							and the CSDojo. A portion of our members consistently volunteer with these organizations
							to provide academic support to Stuyvesant students.
							<ul class="list-inside ml-5">
								<li>
									The CSDojo (room 307) is open from Mondays to Thursdays from right after school to
									5 PM.
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="h4">Community Service</h4>
					<ul class="mt-1 list-disc list-inside [&_ul]:list-[revert]">
						<li>
							Within Stuyvesant, ARISTA members facilitate in-school events, such as open houses,
							Camp Stuy, the college fair, and more.
						</li>
						<li>
							Our members volunteer at dozens of one-off events weekly around the city. If you are
							an organization and would like us to volunteer with you, please email
							aristaeventscommittee@gmail.com.
							<ul class="list-inside ml-5">
								<li>
									Some of our 2024 - 2025 service partners:

									<ul class="list-inside ml-5">
										<li>9 Million Reasons</li>
										<li>W72 Association</li>
										<li>PS 150</li>
										<li>It’s My Park</li>
										<li>Masbia of Queens</li>
										<li>Xavier’s Mission Soup Kitchen</li>
										<li>Margaret Tietz Nursing Home</li>
										<li>Community Church of New York</li>
										<li>Ralph Ellison Memorial</li>
										<li>MoMath</li>
										<li>The Service Collective</li>
										<li>Creighton's Cafe</li>
										<li>Inform Your Community</li>
										<li>DOROT</li>
										<li>and more…</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							Our long-term partnerships, such as with the Prescod Institute for Sport, Teamwork,
							and Education (PISTE), allow a subset of our members to consistently volunteer with
							these organizations to provide academic support to students around the city.
						</li>
					</ul>
				</div>
			</section>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How/when do I apply to join ARISTA?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<section class="w-full text-token space-y-4">
				<h4 class="h4">
					Apply today at <a href="stuyarista.org/apply" class="anchor">stuyarista.org/apply</a> !
				</h4>
				<p>
					Applications to join ARISTA open every spring, typically around February. Freshmen,
					sophomores, and junior Stuyvesant students with a 92 overall GPA (no exceptions will be
					made, not even if you are a tenth off) are eligible to apply.
				</p>

				<p>
					Our application consists of two rounds: if you pass our written application (
					<a href="/apply" class="anchor">stuyarista.org/apply</a>
					) which consists of an extracurricular section and a few essays, you will be called for an
					interview with the executive council.
				</p>

				<p>
					Although our application process is intense and selective, we encourage all eligible
					students to apply (or reapply!). Our application process is quite similar to the college
					admissions process, and we have heard positive feedback from our members who agree that
					our application process has assisted them in gaining experience before applying to college
					or other programs.
				</p>
			</section>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem open>
		<svelte:fragment slot="summary">
			<h3 class="h3">I have another question. Who can I contact?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			For any inquiries not addressed here, please refer to the following contacts:

			<ul class="mt-1 list-disc list-inside [&_ul]:list-[revert]">
				<li>
					<span class="underline font-bold">Ayla Irshad, President</span> (stuyaristanyc@gmail.com)
					<ul class="list-inside ml-5">
						<li>
							This is the main contact for anything ARISTA-related that doesn’t fit into the other
							categories. If you’re not sure who to email, start here.
						</li>
					</ul>
				</li>
				<li>
					<span class="underline font-bold">Tamiyyah Shafiq, Vice President of Operations</span>
					(stuyaristanycops@gmail.com)
					<ul class="list-inside ml-5">
						<li>
							For questions about tutoring logistics, credit tracking, study guides, academic
							resources, PISTE, or anything related to how ARISTA runs behind the scenes. If you’re
							an ARISTA member with concerns about your credits, this is the place to ask.
						</li>
					</ul>
				</li>
				<li>
					<span class="underline font-bold">Alexa Chiang, Vice President of Events</span>
					(stuyaristanycevents@gmail.com)
					<ul class="list-inside ml-5">
						<li>
							If you have questions about an ARISTA event, whether it's logistics, sign-ups, or a
							credit discrepancy, email here. If your question is about a specific event, it helps
							to reach out to the event leader directly.
						</li>
					</ul>
				</li>
				<li>
					<span class="underline font-bold">Lenny Metlitsky, Vice President of Web Development</span
					>
					(stuyaristanycweb@gmail.com)
					<ul class="list-inside ml-5">
						<li>
							For any problems with the ARISTA website, suggestions for improvements, or updates
							that need to be made. If something looks off or isn't working, let us know.
						</li>
					</ul>
				</li>
			</ul>
		</svelte:fragment>
	</AccordionItem>
</Accordion>
