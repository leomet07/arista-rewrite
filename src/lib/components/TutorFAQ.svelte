<script lang="ts">
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
</script>

<Accordion class="card p-4 justify-center">
	<div class="w-full flex justify-around">
		<span class="block chip variant-filled-secondary h4">Frequently Asked Questions (Tutors)</span>
	</div>

	<h2 class="h2 text-center">You ask. ARISTA answers.</h2>
	<h3 class="h3">Updated as of 4/2/2025</h3>

	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">I am an ARISTA member. Can I receive tutoring?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Absolutely! Please create an ARISTA tutee account using an alternate email. (If your ARISTA account is linked to your @stuy.edu email, you can make an account with your @nycstudents.net email, and vice versa.)</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What are the different types of credits I am required to fulfill?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<ul class="list-disc ml-5">
				<li><b>Tutoring:</b> These credits can only be fulfilled through peer-tutoring via the ARISTA website. Select a request here.</li>
				<li><b>Events:</b> These credits are fulfilled by volunteering for events on the events calendar or through PISTE proctoring. These activities range from park clean-ups to assisting in nursing homes. All events will be credited within the week they take place.<br><i>Note: Open Houses are mandatory events that do not count towards your credit fulfillment.</i></li>
				<li><b>Other:</b> These credits are fulfilled by submitting study guides or other specific opportunities, which this semester include working with some of our partner organizations (such as the Writing Center, CS Dojo, or tutoring for PISTE).<br><i>Note: For special opportunities, these definitions can be more malleable and the executive council reserves the right to determine what credit category an opportunity falls under.</i></li>
			</ul>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What are my credit requirements?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>ARISTA's credit requirements differ based on grade and committee affiliation. Credits can change yearly based on member breakdown, tutoring request history, and other factors; the Executive Committee has the discretion to change requirements and will inform of changes with enough notice. Here are the requirements for the 2024-2025 school year:</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What are ARISTA’s mandatory events?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>ARISTA members are required to attend the following mandatory events. Failing to do so will result in a strike:</p>
			<ul class="list-disc ml-5">
				<li>The Induction Ceremony (formal introduction to ARISTA) and the Awards Ceremony in the spring. This will soon be one event, the ARISTA Induction and Awards Ceremony, held in the spring.</li>
				<li>Open House in the fall.</li>
				<li>Open House in the spring.</li>
			</ul>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How is a strike obtained?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>A strike will be issued if any of the following occur:</p>
			<ul class="list-disc ml-5">
				<li>Failing to attend an event for which you have signed up.</li>
				<li>Arriving more than 15 minutes late to an event without an approved excuse.</li>
				<li>Failing to cancel an event by email and on the website 72 hours in advance.</li>
				<li>Engaging in inappropriate conduct during an ARISTA-sanctioned event.</li>
			</ul>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What happens if I receive a strike?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>You will be notified by email if a strike is issued. Accumulating three strikes will result in removal from ARISTA. Strikes remain on your record for the duration of your ARISTA membership, and failure to fulfill credit requirements will also result in expulsion from ARISTA, regardless of the number of strikes. You may appeal expulsion in such cases.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">When does the ARISTA semester end?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<!-- You can add a specific answer here if you have one -->
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Who can I contact for more questions?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>For any inquiries not addressed here, please refer to the following contacts:</p>
			<ul class="mt-1 list-disc list-inside [&_ul]:list-[revert]">
				<li>stuyaristanyc@gmail.com<br/>Ayla Irshad, President<br/>This is the main contact for anything ARISTA-related that doesn’t fit into the other categories. If you’re not sure who to email, start here.</li>
				<li>stuyaristanycops@gmail.com<br/>Tamiyyah Shafiq, Vice President of Operations<br/>For questions about tutoring logistics, credit tracking, study guides, academic resources, PISTE, or anything related to how ARISTA runs behind the scenes. If you’re an ARISTA member with concerns about your credits, this is the place to ask.</li>
				<li>stuyaristanycevents@gmail.com<br/>Alexa Chiang, Vice President of Events<br/>If you have questions about an ARISTA event, whether it's logistics, sign-ups, or a credit discrepancy, email here. If your question is about a specific event, it helps to reach out to the event leader directly.</li>
				<li>stuyaristanycweb@gmail.com<br/>Lenny Metlitsky, Vice President of Web Development<br/>For any problems with the ARISTA website, suggestions for improvements, or updates that need to be made. If something looks off or isn't working, let us know.</li>
			</ul>
		</svelte:fragment>
	</AccordionItem>

	<!-- TUTORING SECTION -->
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How do I get paired with a tutee?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>To be paired with a tutee, simply claim a tutoring request on the "Tutoring" page of the StuyArista website at <a class="anchor" href="/tutoring">stuyarista.org</a>.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Are tutoring requests for one or recurring sessions?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>The tutee has the choice to request a recurring tutor if they wish to meet again. If you have time and are willing to coordinate with the tutee, you may meet with them consistently and will be credited accordingly.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Can I sign up for multiple tutoring sessions at once?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Yes, you can! We encourage you to, whenever possible, sign up for multiple tutoring sessions, if your schedule allows for it.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How can I prepare for a tutoring session as a tutor?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Stay tuned for an in-depth tutoring tips and tricks guide being released soon! In general, be ready to assist them with past assignments or exams. Evaluate what your tutee needs help with, the two general categories falling into content or practice. They typically will need tutoring for a test, but sometimes they just want to know how to study. Remember, your tutoring performance will be evaluated!</p>
			<p>To prepare for content review, use your old notes, tests, relevant materials, Google Classroom archives, textbooks, Khan Academy, and other resources.</p>
			<p>To prepare to assist with practice questions, utilize your past resources. If possible, ask your tutee to send the materials they’re working on ahead of time, so you can prepare more thoroughly.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What do I do once I am paired with a tutee?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Once paired, it’s your responsibility to reach out to your tutee. You can introduce yourself via email. Here is a bare bones sample email template to get you started:</p>
			<blockquote class="blockquote">
				Hi [Tutee's Name],<br>
				I’m [Your Name], and I will be your [Subject] tutor! I am available to meet on [Day] at [Time or Period]. Let me know what times work best for you, and I would love to meet and help with anything you have questions about. If possible, it would be helpful for you to send material or specific work you need assistance with beforehand so I can prepare for our session.<br>
				Best,<br>
				[Your Name]
			</blockquote>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How are tutoring hours rounded?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Tutoring sessions are rounded to the nearest tenth of an hour. To calculate the total duration, divide the total amount of minutes you met by 60, and rounding to the nearest tenth.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How do I complete a finished tutoring session?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Your tutee needs to complete the tutoring request on their end. If they have not done so, kindly reach out to them and remind them to complete the session on the tutoring page. If you have trouble getting in contact with the tutee, please email stuyaristanycops@gmail.com.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">I claimed a tutoring request by accident/the request is outdated/the tutee no longer needs tutoring. What should I do?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>If you’ve claimed a tutoring request by mistake, or if the request is no longer needed, please contact stuyaristanycops@gmail.com for assistance.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">My tutee isn’t replying to my emails.</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Please forward your email to the tutee to stuyaristanycops@gmail.com.</p>
		</svelte:fragment>
	</AccordionItem>

	<!-- EVENTS AND CREDITING -->
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How do I sign up for an event?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>To sign up for an event, visit the calendar on the website. You must receive a confirmation email after signing up to confirm your participation. If you are not accepted, you will be notified via email that you have been waitlisted.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Do credits carry over semesters?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Extra credits earned beyond your required amount will roll over to their respective categories 1:1 from semester 1 to semester 2 within the same school year. Credits do not carry over between different school years.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Why haven’t I received credits for ___ event yet?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Please contact stuyaristanycevents@gmail.com regarding crediting for events from the events calendar or stuyaristanycops@gmail.com for crediting from other opportunities.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Why is the credit requirement not properly accounting for my grade/committee?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Please contact stuyaristanycops@gmail.com.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Can I transfer credits to another category?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>No, credits cannot be transferred between categories. Tutoring credits, event credits, and “other” credits are all tracked separately. However, at the end of the year, you will receive a certificate recognizing the accumulation of all of your hours.</p>
		</svelte:fragment>
	</AccordionItem>

	<!-- MISC -->
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How much are dues?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Dues are $20 and are required of all ARISTA members to help fund the organization. If dues present a financial burden and you qualify for free/reduced lunch, please contact us directly via email for assistance. Dues collection typically takes place in the fall, of which members are notified via email.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How do I get a stole?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Stoles will be distributed to graduating seniors who successfully complete the requirements for both semesters.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">How are inter-organization events credited?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>If multiple organizations (such as Red Cross, Student Union, Key Club, Caucus) simultaneously hold participation in an event with ARISTA, credits will only apply to one organization of your choosing, typically ARISTA.</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What is the credit breakdown for PISTE?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<ul class="list-disc ml-5">
				<li>Tutoring hours count toward “other” credits. Once the “other” credit requirement is fulfilled, any remaining tutoring hours will be applied to the events category.</li>
				<li>Proctoring hours count toward event credits.</li>
			</ul>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">What grade point average must I maintain to remain an ARISTA member?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>All ARISTA members must keep their average at or above a 92 throughout their entire membership in ARISTA; they will be removed if it drops below 92 (no exceptions).</p>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h3 class="h3">Can I appeal strikes?</h3>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>ARISTA members can only appeal strikes from the most recent semester. Strikes do NOT reset every year.</p>
		</svelte:fragment>
	</AccordionItem>
</Accordion> 