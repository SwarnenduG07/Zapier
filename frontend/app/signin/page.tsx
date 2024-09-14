"use client"
import { CheckFeature } from "@/components/CheckFetures";
import { Input } from "@/components/Input";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";

export default function() {
    return <div>
        <NavBar />
        <div className="flex">
            <div className="flex pt-20 max-w-4xl">
            <div className="flex-1 pt-20 px-4">
              <div className="font-semibold text-3xl  pb-4">
              Join millions worldwide who automate their work using Zapier.
              </div>
              <div className="pb-6 pt-4">
              <CheckFeature label={"Easy setup, no coding required"}/>
              </div>
              <div className="pb-6">
              <CheckFeature label={"Free forever for core features"}/>
              </div>
              <div className="pb-6">
              <CheckFeature label={"14-day trial of premiu, features & apps"}/>
              </div>
            </div> 
            <div className="flex-1 pt-6 px-4 border pb-6 mt-12 rounded">
                <Input label={"Name"} onChange={e => {

                }} type="text" placeholder="your Name"></Input>
                <Input label={"Email"} onChange={e => {

                }} type="text" placeholder="your Email"></Input>
                <Input label={"Passwrod"} onChange={e => {

                }} type="text" placeholder="your Password"></Input>
                <div className="pt-4 pb-4">
                <Button className="w-full rounded-full bg-orange-700">
                    Get Started Free
                </Button>
                </div>
               </div>
            </div>
        </div>
    </div>
}