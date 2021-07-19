import ClayButton from '@clayui/button';
import ClayDropDown from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import ClayLayout from '@clayui/layout';
import ClayLink from '@clayui/link';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

import STATES from '../constants/taskStates';

const TaskFilter = ({taskStateFilter, tasks}) => {
	const [filterOpen, setFilterOpen] = useState(false);

	const router = useRouter();
	const basepath = router.asPath.split('?')[0];

	return (
		<ClayLayout.ContentCol>
			<ClayDropDown
				active={filterOpen}
				alignmentPosition={3}
				onActiveChange={setFilterOpen}
				trigger={
					<ClayButton displayType="secondary" small>
						<span className="inline-item inline-item-before">
							<ClayIcon symbol="filter" />
						</span>

						{`Filter: ${
							taskStateFilter
								? STATES.byState[taskStateFilter].label
								: 'All'
						}`}
					</ClayButton>
				}
			>
				<ClayDropDown.ItemList>
					<ClayDropDown.Group header="Filter by status">
						<ClayLink href={basepath}>
							<ClayDropDown.Item
								symbolRight={!taskStateFilter && 'check'}
							>
								{'All'}
							</ClayDropDown.Item>
						</ClayLink>

						{Object.values(STATES.byName).map((state) => {
							return (
								<ClayLink
									href={`${basepath}?status=${state.state}`}
									key={state.state}
								>
									<ClayDropDown.Item
										symbolRight={
											taskStateFilter === state.state &&
											'check'
										}
									>
										{state.label}
									</ClayDropDown.Item>
								</ClayLink>
							);
						})}
					</ClayDropDown.Group>
				</ClayDropDown.ItemList>
			</ClayDropDown>
		</ClayLayout.ContentCol>
	);
};

export default TaskFilter;
