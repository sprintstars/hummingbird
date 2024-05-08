export default function Home() {
	return (
		<div>
			<div className="lg: container mx-auto h-screen max-w-8xl sm:px-6 pt-4">
				<div className="grid grid-cols-3 gap-4">
					<div className="grid grid-cols-1 gap-4">
						<div>Dropdown component</div>
						<div className="">
							<button
								type="button"
								className="mb-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-green-600 px-4 py-3 text-sm font-semibold text-black disabled:opacity-50"
							>
								Twillio
							</button>
							<button
								type="button"
								className="mb-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-green-600 px-4 py-3 text-sm font-semibold text-black disabled:opacity-50"
							>
								Netlify
							</button>
							<button
								type="button"
								className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-500 px-4 py-3 text-sm font-semibold text-black disabled:opacity-50"
							>
								Auth0
							</button>
						</div>
					</div>
					<div className="... col-span-2 m-auto text-white">
						<div className="mb-4">Distruptions 1</div>
						<div className="mb-4">Recently Resolved 2</div>
						<div className="mb-4">Fully Operational 3</div>
					</div>
				</div>
			</div>
		</div>
	);
}
