import Layout from "@/layouts/Layout";
import ky from "ky";
import { createMutation } from "@tanstack/solid-query";
import { Match, Switch, createSignal, For } from "solid-js";
import { Title } from "@solidjs/meta";

type Message = {
    message: string;
}

const DashBoard = (props: { url: string; domains: string[] }) => {
    let subdomain: HTMLInputElement;
    let ttl: HTMLInputElement;
    let reqType: HTMLSelectElement;
    let prefix: HTMLInputElement;
    let host: HTMLInputElement;
    let description: HTMLTextAreaElement;
    const params = new URLSearchParams(window.location.search);
    let [baseUrl, setUrl] = createSignal(params.get("url") ?? props.domains[0]);
    const collections = () => props.domains;
    const [domain, setDomain] = createSignal(baseUrl());
    const postFormData = createMutation(() => ({
        mutationKey: ['post-form'],
        mutationFn: () => ky.post<Message>('/data', {
            json: {
                domain: baseUrl(), ttl: Number(ttl.value), kind: reqType.value, prefix: prefix.value, host: host.value, description: description.value
            }
        }).json()
    }));
    return (
        <>
            <Title>Dashboard</Title>
            <section class="min-h-screen dark:bg-gray-900">
                <div class="mx-auto max-w-2xl px-4 py-8 lg:py-16">
                    <h2 class="mb-4 text-5xl font-bold text-slate-50">Register a Sub-Domain</h2>
                    <Switch>
                        <Match when={postFormData.isSuccess}>
                            <span class="my-4 flex w-full border-4 border-pink-500 bg-pink-500 p-4 text-xl text-slate-50">
                                {postFormData.data.message}
                            </span>
                        </Match>
                        <Match when={postFormData.isError}>
                            <span class="my-4 flex w-full border-4 border-red-500 bg-red-500 p-4 text-xl text-slate-50">
                                {postFormData.error.message}
                            </span>
                        </Match>
                        <Match when={postFormData.isPending}>
                            <span class="my-4 flex w-full border-4 border-yellow-500 bg-yellow-500 p-4 text-xl text-slate-50">
                                loading...
                            </span>
                        </Match>
                    </Switch>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log({ host: host.value, prefix: prefix.value, description: description.value })
                        postFormData.mutate()
                    }}>
                        <div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="sub" class=" mb-2 block text-xl font-bold text-slate-50 dark:text-white">FQDN</label>
                                <input type="text" name="sub" id="name" class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" placeholder="Type product name" disabled={true} ref={subdomain} value={domain()} />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="full" class="mb-2 block text-xl font-bold text-slate-50 dark:text-white">DomainList</label>
                                <select onInput={(e) => {
                                    setUrl(e.currentTarget.value)
                                    const join = prefix.value ? "." : "";
                                    setDomain(() => `${prefix.value}${join}${baseUrl()}`)

                                }} ref={baseUrl} name="full" id="full-select" class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400">
                                    <For each={collections()}>
                                        {(item) => <option selected={baseUrl() === item} value={item}>{item}</option>}
                                    </For>
                                </select>
                            </div>
                            <div class="w-full">
                                <label for="prefix" class="mb-2 block text-lg font-bold text-slate-50 dark:text-white">Prefix</label>
                                <input ref={prefix} onInput={(e) => {
                                    const join = e.target.value ? "." : "";
                                    setDomain(() => `${e.target.value}${join}${baseUrl()}`)
                                }} autocomplete="off" type="text" name="prefix" id="prefix" class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" placeholder="Product prefix" required={true} value={"*"} />
                            </div>
                            <div class="w-full">
                                <label for="ttl" class="mb-2 block text-xl font-bold text-slate-50 dark:text-white">TTL (in mins)</label>
                                <input ref={ttl} type="number" name="ttl" id="ttl" class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" value={10} placeholder="10?" required={true} />
                            </div>
                            <div>
                                <label for="domain-type" class="mb-2 block text-xl font-bold text-slate-50 dark:text-white">Type</label>
                                <select ref={reqType} id="domain-type" name="options" class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400">
                                    <option selected={true} value="A">A Host</option>
                                    <option value="CNAME">CNAME</option>
                                    <option value="MX">MX</option>
                                    <option value="TXT">TXT</option>
                                </select>
                            </div>
                            <div>
                                <label for="host-target-ip" class="mb-2 block text-xl font-bold text-slate-50 dark:text-white">Host Target (IP)</label>
                                <input ref={host} autocomplete="off" type="text" pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}$" name="host-target-ip" id="host-target-ip" class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" placeholder="Ex. 1.1.1.1" required={true} />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="description" class="mb-2 block text-xl font-bold text-slate-50 dark:text-white">Description</label>
                                <textarea ref={description} id="description" name="description" rows="8" class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xl text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" placeholder="Write a product description here..."></textarea>
                            </div>
                        </div>
                        <div class="flex items-center space-x-8">
                            <button type="submit" class="inline-flex items-center rounded-lg border border-red-600 bg-slate-100 px-5 py-2.5 text-center text-2xl font-bold text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900" disabled={postFormData.isPending}>
                                <svg class="pr-1" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="overflow: visible;" height="1em" width="1em"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3 0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32v-96h57.7c12.3 0 22.3-10 22.3-22.3 0-6.2-2.6-12.1-7.1-16.3l-107.1-99.9c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5l-107.1 99.9z"></path></svg>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default DashBoard;

DashBoard.layout = Layout;
