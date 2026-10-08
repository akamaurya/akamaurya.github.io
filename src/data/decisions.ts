// One entry per decision. Format on the page: the obvious move, what I did, why.
// ponytail: ten so far, eight on the home page. /decisions/ shows them all in Phase 3.
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
		why: 'A ₹2,000 phone shoot and an image pipeline did the job.',
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
		id: 'pixel-pipeline-prototype',
		title: 'Pitched the pricing pipeline before anyone asked for it',
		source: 'Google via Smollan',
		obvious: 'Keep assembling the weekly analysis by hand. That was the job as given.',
		did: 'Built a prototype on my own, showed it to my manager, got her yes, then built the full pipeline.',
		why: 'A working prototype gets a yes faster than a proposal, and I can improve it while it runs. Here it also answered the two questions I knew my manager would ask: is the data right, and does the output read the way Google’s decks read. She could check both on screen.',
		homeCard: true,
	},
	{
		// The only miss. ponytail: reuses the three fields as built, what happened, what I changed; /decisions/ labels them when it ships.
		id: 'emea-deck-miss',
		title: 'Built a pricing deck my manager liked and the client could not read',
		source: 'Google via Smollan',
		obvious: 'A recurring pricing deck for 33 markets. I grouped countries into regions and devices into price segments, and showed monthly changes as a heatmap built from my own Python pipeline.',
		did: 'The pricing lead on the Google side found it too complicated. My country-level aggregation was also not how her team measured price.',
		why: 'I rebuilt the aggregation around the price changes her team tracked. I had designed it for me. Now I find out how the reader already measures the thing before I design anything.',
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
	{
		id: 'edge-vision-ship-gate',
		title: 'Gated releases on the worst cell, not the average, and it blocked my own model',
		source: 'Edge vision test',
		obvious: 'Ship the new classifier. It averaged 90.7% on the test set.',
		did: 'Wrote a rule first: a new version ships only if no cell of a people-labelled test set gets worse. It failed my own classifier.',
		why: 'It scored 47% on one cell, the new part under lamp light. An average hides the one place a line breaks.',
		homeCard: true,
	},
];
