// Puzzle 1: Async Race Condition
const asyncPuzzle = {
    cache: new Map(),
    async getData(key) {
        if (this.cache.has(key)) return this.cache.get(key);
        const result = await fetch(`/api/${key}`);
        this.cache.set(key, result);
        return result;
    },
    async challenge() {
        const results = await Promise.all([
            this.getData('x'),
            this.getData('x'),
            this.getData('x')
        ]);
        // Why might this make multiple API calls despite caching?
    }
};

// Puzzle 2: Memory Leak Detective
class EventManager {
    constructor() {
        this.handlers = new WeakMap();
        this.element = document.getElementById('memory-test');
    }

    attach() {
        const handler = () => {
            this.handlers.set(this, {
                data: new Array(1000000).fill('test'),
                cleanup: () => this.detach()
            });
        };
        this.element.addEventListener('click', handler);
    }

    detach() {
        // Why is memory still growing on repeated attach/detach?
        this.handlers.delete(this);
    }
}

// Puzzle 3: Proxy Trap
const target = {
    name: 'test',
    _private: 'secret'
};

const handler = {
    get(target, prop) {
        if (prop.startsWith('_')) return undefined;
        return target[prop];
    },
    set(target, prop, value) {
        if (prop.startsWith('_')) return false;
        target[prop] = value;
        return true;
    },
    deleteProperty(target, prop) {
        if (prop.startsWith('_')) return false;
        return delete target[prop];
    }
};

const proxy = new Proxy(target, handler);
// Challenge: Access _private despite the protection

// Puzzle 4: Generator Deadlock
function* infiniteGenerator() {
    let current = 0;
    while (true) {
        const reset = yield current++;
        if (reset) current = 0;
    }
}

async function* asyncWrapper(generator) {
    const gen = generator();
    while (true) {
        const next = gen.next();
        // Why does this cause a deadlock?
        yield await next;
    }
}

// Puzzle 5: Prototype Chain Mutation
class Base {
    constructor() {
        this.value = 42;
    }
    getValue() {
        return this.value;
    }
}

class Derived extends Base {
    constructor() {
        super();
        // What happens if we do this?
        Object.setPrototypeOf(this, {
            getValue: function () {
                return this.value * 2;
            }
        });
    }
}

function toggleSolution(solutionId) {
    const solution = document.getElementById(solutionId);
    solution.style.display = solution.style.display === 'none' || !solution.style.display ? 'block' : 'none';
}
