// One entry per decision. Format on the page: the obvious move, what I did, why.
// ponytail: eight of the eleven so far. The rest arrive with /decisions/ in Phase 3.
export interface Decision {
	id: string;
	title: string;
	source: string;
	obvious: string;
	did: string;
	why: string;
	homeCard: boolean;
}

export const decisions: Decision[] = [
	{
		id: 'cold-coffee',
		title: 'Chose Cold Coffee over Veg Manchurian as the free add-on',
		source: 'The Divine Hima',
		obvious: 'Pick Veg Manchurian. At 5.7 times perceived value per rupee of cost, it scored best on the sheet.',
		did: 'Picked Cold Coffee, at 2.8 times.',
		why: 'Manchurian is a wok dish that competes for kitchen minutes with dine-in orders. Cold coffee is made in seconds. Kitchen time, not rupees, was the scarce resource.',
		homeCard: true,
	},
	{
		id: 'photo-shoot',
		title: 'Declined a ₹90,000 photo shoot and built an image pipeline',
		source: 'The Divine Hima',
		obvious: 'Hire a photographer. Weak photos look like the problem.',
		did: 'Declined it. Directed AI agents to build a pipeline that turns phone photos of a dish into graded, correctly cropped menu cards.',
		why: 'The shoot came out at about a 15-year payback. A phone shoot came out at about four months.',
		homeCard: true,
	},
	{
		id: 'redirect',
		title: 'Refused the redirect the hosting dashboard recommended',
		source: 'The Divine Hima',
		obvious: 'Turn on the setting. The dashboard sells it as a security fix.',
		did: 'Read the response headers first. Found three cache layers in front of the site, and left it off.',
		why: 'The site already forced HTTPS. On that stack the new rule would have looped forever and taken the admin panel down with the site.',
		homeCard: true,
	},
	{
		id: 'hiring-budget',
		title: 'Cut my own hiring budget by nearly a third, ten days after recommending it',
		source: 'The Divine Hima',
		obvious: 'Stand by the number I had already recommended.',
		did: 'Cut the base salary in my own recommendation by nearly a third, and retitled the role to match the pay.',
		why: 'TODO: Chander to supply the reason for the cut. The source note records the change, not the reason.',
		homeCard: true,
	},
	{
		id: 'loadbuddy-one-screen',
		title: 'Shipped LoadBuddy with one screen and refused the second feature',
		source: 'LoadBuddy',
		obvious: 'Build a training app: workout logs, a feed, a coach.',
		did: 'Built one full-screen colour. Green means push, orange means recover, with a countdown to the next switch.',
		why: 'The problem is one forgotten decision a day. The best tools remove the thinking. They do not add to it.',
		homeCard: true,
	},
	{
		id: 'portfolio-monitor-http',
		title: 'Dropped the browser from Portfolio Monitor’s login',
		source: 'Portfolio Monitor',
		obvious: 'Drive the broker’s login page with a headless browser.',
		did: 'Reverse-engineered the broker’s web login and replaced the browser with direct HTTP requests and two-factor codes.',
		why: 'Fewer moving parts in a job that runs unattended once a month. It runs on the GitHub Actions free tier at zero cost.',
		homeCard: false,
	},
	{
		id: 'superyou-correction',
		title: 'Corrected my own SuperYou finding after a second data pull',
		source: 'SuperYou Shelf Read',
		obvious: 'Send the first read as it was.',
		did: 'Pulled the data again the next evening and changed the finding.',
		why: 'Zepto hides some out-of-stock rows from search. A missing row is not a delisting.',
		homeCard: true,
	},
	{
		id: 'festpass-kill-rule',
		title: 'Wrote a kill rule for FestPass before building anything',
		source: 'FestPass',
		obvious: 'Build the product, then look for buyers.',
		did: 'Wrote down when I would stop: if losses are under about ₹10k and juniors cope fine, shelve it.',
		why: 'Small clubs are users, not customers. They have no budget, and free junior labour already does the work.',
		homeCard: false,
	},
];
