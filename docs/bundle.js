
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/App.svelte generated by Svelte v3.12.1 */
    const { Object: Object_1, console: console_1 } = globals;

    const file = "src/App.svelte";

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.aula = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.hora = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.dia = list[i];
    	return child_ctx;
    }

    // (128:8) {#each Object.values(dia.horarios[hora]) as aula}
    function create_each_block_2(ctx) {
    	var div, t0_value = ctx.aula.local + "", t0, t1, t2_value = ctx.aula.atividade + "", t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text(": ");
    			t2 = text(t2_value);
    			attr_dev(div, "local-e-atividade", "");
    			attr_dev(div, "class", "svelte-4mzp31");
    			add_location(div, file, 128, 9, 2781);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block_2.name, type: "each", source: "(128:8) {#each Object.values(dia.horarios[hora]) as aula}", ctx });
    	return block;
    }

    // (124:4) {#each Object.keys(dia.horarios) as hora}
    function create_each_block_1(ctx) {
    	var div2, div0, t0_value = ctx.hora + "", t0, t1, t2, div1, t3;

    	let each_value_2 = ctx.Object.values(ctx.dia.horarios[ctx.hora]);

    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text(":10");
    			t2 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			attr_dev(div0, "horario", "");
    			attr_dev(div0, "fundo-amarelo", "");
    			attr_dev(div0, "class", "svelte-4mzp31");
    			add_location(div0, file, 125, 6, 2658);
    			add_location(div1, file, 126, 7, 2708);
    			attr_dev(div2, "atividades-por-horario", "");
    			attr_dev(div2, "class", "svelte-4mzp31");
    			add_location(div2, file, 124, 5, 2623);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div2, t3);
    		},

    		p: function update(changed, ctx) {
    			if (changed.Object || changed.tranformarParaAtividadesPorHora) {
    				each_value_2 = ctx.Object.values(ctx.dia.horarios[ctx.hora]);

    				let i;
    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value_2.length;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div2);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block_1.name, type: "each", source: "(124:4) {#each Object.keys(dia.horarios) as hora}", ctx });
    	return block;
    }

    // (122:2) {#each tranformarParaAtividadesPorHora() as dia}
    function create_each_block(ctx) {
    	var h2, t0_value = ctx.dia.diaSemana + "", t0, t1, each_1_anchor;

    	let each_value_1 = ctx.Object.keys(ctx.dia.horarios);

    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			add_location(h2, file, 122, 4, 2547);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			insert_dev(target, t1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},

    		p: function update(changed, ctx) {
    			if (changed.Object || changed.tranformarParaAtividadesPorHora) {
    				each_value_1 = ctx.Object.keys(ctx.dia.horarios);

    				let i;
    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value_1.length;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h2);
    				detach_dev(t1);
    			}

    			destroy_each(each_blocks, detaching);

    			if (detaching) {
    				detach_dev(each_1_anchor);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(122:2) {#each tranformarParaAtividadesPorHora() as dia}", ctx });
    	return block;
    }

    function create_fragment(ctx) {
    	var div5, div0, t0, div3, div1, img, t1, div2, br0, t2, br1, t3, a, t5, div4, t6, br2, t7, br3, t8, div9, div6, t9, div7, t10, div8;

    	let each_value = ctx.tranformarParaAtividadesPorHora();

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			img = element("img");
    			t1 = text("\n\t\tHorários não oficiais das aulas de dança nas unidades da Rede Alpha.\n\t\t");
    			div2 = element("div");
    			br0 = element("br");
    			t2 = text("\n\t\t\tCorreções e sugestões:");
    			br1 = element("br");
    			t3 = space();
    			a = element("a");
    			a.textContent = "WhatsApp:\n\t\t\t\t(71)98286-4766";
    			t5 = space();
    			div4 = element("div");
    			t6 = space();
    			br2 = element("br");
    			t7 = space();
    			br3 = element("br");
    			t8 = space();
    			div9 = element("div");
    			div6 = element("div");
    			t9 = space();
    			div7 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t10 = space();
    			div8 = element("div");
    			attr_dev(div0, "espacador", "");
    			attr_dev(div0, "class", "svelte-4mzp31");
    			add_location(div0, file, 101, 1, 2006);
    			attr_dev(img, "src", "images/alphadance.png");
    			attr_dev(img, "alt", "alphadance");
    			add_location(img, file, 104, 3, 2046);
    			add_location(div1, file, 103, 2, 2037);
    			add_location(br0, file, 107, 7, 2184);
    			add_location(br1, file, 108, 25, 2214);
    			attr_dev(a, "href", "https://api.whatsapp.com/send?phone=5571982864766&text=Ol%C3%A1%20tenho%20uma%20sugest%C3%A3o%20sobre%20o%20alphadance.");
    			attr_dev(a, "class", "svelte-4mzp31");
    			add_location(a, file, 108, 30, 2219);
    			add_location(div2, file, 107, 2, 2179);
    			add_location(div3, file, 102, 1, 2029);
    			attr_dev(div4, "espacador", "");
    			attr_dev(div4, "class", "svelte-4mzp31");
    			add_location(div4, file, 113, 1, 2404);
    			attr_dev(div5, "topo", "");
    			attr_dev(div5, "class", "svelte-4mzp31");
    			add_location(div5, file, 100, 0, 1994);
    			add_location(br2, file, 115, 0, 2433);
    			add_location(br3, file, 116, 0, 2438);
    			attr_dev(div6, "espacador", "");
    			attr_dev(div6, "class", "svelte-4mzp31");
    			add_location(div6, file, 119, 1, 2463);
    			add_location(div7, file, 120, 1, 2486);
    			attr_dev(div8, "espacador", "");
    			attr_dev(div8, "class", "svelte-4mzp31");
    			add_location(div8, file, 135, 1, 2913);
    			attr_dev(div9, "programacao", "");
    			attr_dev(div9, "class", "svelte-4mzp31");
    			add_location(div9, file, 118, 0, 2444);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div5, t0);
    			append_dev(div5, div3);
    			append_dev(div3, div1);
    			append_dev(div1, img);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, br0);
    			append_dev(div2, t2);
    			append_dev(div2, br1);
    			append_dev(div2, t3);
    			append_dev(div2, a);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div6);
    			append_dev(div9, t9);
    			append_dev(div9, div7);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div7, null);
    			}

    			append_dev(div9, t10);
    			append_dev(div9, div8);
    		},

    		p: function update(changed, ctx) {
    			if (changed.Object || changed.tranformarParaAtividadesPorHora) {
    				each_value = ctx.tranformarParaAtividadesPorHora();

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div7, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div5);
    				detach_dev(t6);
    				detach_dev(br2);
    				detach_dev(t7);
    				detach_dev(br3);
    				detach_dev(t8);
    				detach_dev(div9);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { atividades } = $$props;

    	function tranformarParaAtividadesPorHora() {
    		let trans = [];
    		let transAtividadesPorDia;
    		let transAtividadesAgrupadasPorHora;
    		const nomesAtividades = { f: 'FitDance', z: 'Zumba' };

    		atividades.forEach(atividadesPorDia => {
    			transAtividadesPorDia = {};
    			transAtividadesPorDia.diaSemana = atividadesPorDia.diaSemana;
    			transAtividadesPorDia.horarios = [];
    			for (let h = 6; h <= 20; ++h) {
    				atividadesPorDia.locais.forEach(local => {
    					//  console.log('local', local);
    					//  console.log('local.aulas', local.aulas);
    					Object.entries(local.aulas).forEach(aulasHorarios => {
    						console.log('aulasHorarios', aulasHorarios);
    						aulasHorarios[1].forEach(horario => {
    							console.log('horario', horario);
    							if (horario == h) {
    								transAtividadesPorDia.horarios.push({ hora: horario, atividade: nomesAtividades[aulasHorarios[0]], local: local.nome });
    							}
    						});
    					});
    				});
    			}

    			transAtividadesAgrupadasPorHora = transAtividadesPorDia.horarios.reduce(function (r, a) {
    				r[a.hora] = r[a.hora] || [];
    				r[a.hora].push(a);
    				return r;
    			}, Object.create(null));
    			transAtividadesPorDia.horarios = transAtividadesAgrupadasPorHora;

    			trans.push(transAtividadesPorDia);

    		});

    		// console.log('trans', trans);

    		return trans;
    	}

    	const writable_props = ['atividades'];
    	Object_1.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('atividades' in $$props) $$invalidate('atividades', atividades = $$props.atividades);
    	};

    	$$self.$capture_state = () => {
    		return { atividades };
    	};

    	$$self.$inject_state = $$props => {
    		if ('atividades' in $$props) $$invalidate('atividades', atividades = $$props.atividades);
    	};

    	return {
    		atividades,
    		tranformarParaAtividadesPorHora,
    		Object
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["atividades"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.atividades === undefined && !('atividades' in props)) {
    			console_1.warn("<App> was created without expected prop 'atividades'");
    		}
    	}

    	get atividades() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set atividades(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const atividades = [
    	{
    		diaSemana: "Segunda",
    		locais: [
    			{
    				nome: "Aracaju",
    				aulas: { f: [9], z: [19] },
    			},
    			{
    				nome: 'Pituba',
    				aulas: { f: [12, 19], z: [9] }
    			},
    			{
    				nome: 'Shopping Bella Vista',
    				aulas: { f: [9], z: [19] }
    			}
    		]
    	},
    	{
    		diaSemana: "Terça",
    		locais: [
    			{
    				nome: "Aracaju",
    				aulas: { f: [19], z: [8] },
    			},
    			{
    				nome: 'Pituba',
    				aulas: { z: [18] }
    			},
    			{
    				nome: 'Itaigara',
    				aulas: { f: [9, 19] }
    			},
    			{
    				nome: 'Shopping Bella Vista',
    				aulas: { f: [9, 19] }
    			}
    		]
    	},
    	{
    		diaSemana: "Quarta",
    		locais: [
    			{
    				nome: "Aracaju",
    				aulas: { z: [19] },
    			},
    			{
    				nome: 'Pituba',
    				aulas: { f: [7, 18, 19] }
    			},
    			{
    				nome: 'Itaigara',
    				aulas: { z: [8, 19] }
    			},
    			{
    				nome: 'Shopping Bella Vista',
    				aulas: { z: [8, 19] }
    			}
    		]
    	},
    	{
    		diaSemana: "Quinta",
    		locais: [
    			{
    				nome: "Aracaju",
    				aulas: { f: [19], z: [8] },
    			},
    			{
    				nome: 'Pituba',
    				aulas: { z: [17] }
    			},
    			{
    				nome: 'Itaigara',
    				aulas: { f: [9, 19] }
    			},
    			{
    				nome: 'Shopping Bella Vista',
    				aulas: { f: [9, 19] }
    			}
    		]
    	}

    ];


    const app = new App({
    	target: document.body,
    	props: {
    		atividades: atividades
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
