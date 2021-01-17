class DOMHelper {
	static clearEventListneds(element) {
		const clonedEl = element.cloneNode(true);
		element.replaceWith(clonedEl);
		return clonedEl;
	}

	static moveElement(elementID, newDestinationSelector) {
		const element = document.getElementById(elementID);
		const destinationEl = document.querySelector(newDestinationSelector);
		destinationEl.append(element);
	}
}

class Component {
	constructor(hostElId, insertBefore = false) {
		if (hostElId) {
			this.hostEl = document.getElementById(hostElId);
		} else {
			this.hostEl = document.body;
		}
		this.insertBefore = insertBefore;
	}
	detach() {
		if (this.element) {
			this.element.remove();
		}
	}
	attach() {
		console.log(this.insertBefore);

		this.hostEl.insertAdjacentElement(
			this.insertBefore ? 'afterbegin' : 'beforeend',
			this.element
		);
	}
}

class ToolTip extends Component {
	constructor(closeNotifierFn) {
		super('active-projects', true);
		this.closeNotifier = closeNotifierFn;
		this.create();
	}
	closeToolTip = () => {
		this.detach();
		this.closeNotifier();
	};
	create() {
		const tooltipElement = document.createElement('div');
		tooltipElement.className = 'card';
		tooltipElement.textContent = 'Hello Dear!!!, click on me to delete :)';
		tooltipElement.addEventListener('click', this.closeToolTip);
		this.element = tooltipElement;
	}
}

class ProjectItem {
	hasActiveTooltip = false;

	constructor(id, updateProjectListsFunction, type) {
		this.id = id;
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.connectMoreInfoBtn();
		this.connectSwitchBtn(type);
	}

	showMoreInfo() {
		if (this.hasActiveTooltip) {
			return;
		}
		const tooltip = new ToolTip(() => {
			this.hasActiveTooltip = false;
		});
		tooltip.attach();
		this.hasActiveTooltip = true;
	}

	connectMoreInfoBtn() {
		const projectItemEl = document.getElementById(this.id);
		const moreInfoBtn = projectItemEl.querySelector('button:first-of-type');

		moreInfoBtn.addEventListener('click', this.showMoreInfo);
	}

	connectSwitchBtn(type) {
		const projectItemEl = document.getElementById(this.id);
		let switchBtn = projectItemEl.querySelector('button:last-of-type');
		switchBtn = DOMHelper.clearEventListneds(switchBtn);
		switchBtn.textContent = type === 'active' ? 'Finish' : 'Active';
		switchBtn.addEventListener(
			'click',
			this.updateProjectListsHandler.bind(null, this.id)
		);
	}

	update(updateProjectListsFunction, type) {
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.connectSwitchBtn(type);
	}
}

class ProjectList {
	projects = [];

	constructor(type) {
		this.type = type;
		const prjItems = document.querySelectorAll(`#${type}-projects li`);

		for (const prjItem of prjItems) {
			this.projects.push(
				new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
			);
		}
		console.log(this.projects);
	}

	setSwitchHandlerFunction(switchHandlerFunction) {
		this.switchHandlerFunction = switchHandlerFunction;
	}

	// add project to finished projects ist
	addProject(project) {
		this.projects.push(project);
		DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
		console.log(`#${this.type}-projects ul`);

		project.update(this.switchProject.bind(this), this.type);
	}

	// remove project from projects list
	switchProject(projectId) {
		console.log(projectId);
		this.switchHandlerFunction(this.projects.find((p) => p.id === projectId));
		const projectIndex = this.projects.findIndex((p) => p.id === projectId);
		this.projects.splice(projectIndex);
	}
}

class App {
	static init() {
		const activeProjectList = new ProjectList('active');
		const finishedProjectList = new ProjectList('finished');

		activeProjectList.setSwitchHandlerFunction(
			finishedProjectList.addProject.bind(finishedProjectList)
		);
		finishedProjectList.setSwitchHandlerFunction(
			activeProjectList.addProject.bind(activeProjectList)
		);
	}
}

App.init();
