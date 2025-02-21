import CheckItem from "../components/CheckItem";
import IconLink from "../components/IconLink";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export default function PerfectionTracker() {

    return (
        <main>
            <h1>Perfection Tracker</h1>
            <div className="info-cards-container">

                <section id="items-shipped" className="card">
                    <div className="flex justify-between">
                        <label className="check-container">
                            <input 
                                type="checkbox" 
                                id={"shipped-collection-checkbox"} 
                                name={"shipped-collection"} 
                                value={"shipped-collection"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*/ />
                            Ship each item in the 'Items Shipped' collection.
                        </label>
                        <ChevronDown className="inline"/>
                    </div>
                </section>

                
                <section id="obelisks-built" className="card">
                    <div className="flex justify-between">
                        <label className="check-container">
                            <input 
                                type="checkbox" 
                                id={"shipped-collection-checkbox"} 
                                name={"shipped-collection"} 
                                value={"Shipped Collection"} 
                                /*checked={"isChecked"} 
                                onChange={handleOnChange}*/ />
                            Build the Earth, Water, Desert, and Island Obelisks.
                        </label>
                        <ChevronUp className="inline"/>
                    </div>

                    <div className="subcards-container flex flex-row basis-lg">
                        <article id="earth-obelisk-card" className="card">
                            <label className="check-container bottom-border">
                                <input 
                                    type="checkbox" 
                                    id={"earth-obelisk-checkbox"} 
                                    name={"earth-obelisk"} 
                                    value={"Earth Obelisk"} 
                                    /*checked={"isChecked"} 
                                    onChange={handleOnChange}*//>
                                    Earth Obelisk
                            </label>
                            <div className="pt-3">
                                <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
                                <IconLink category="Resource" label="Iridium Bar" qty={10}/>
                                <IconLink category="Mineral" label="Earth Crystal" qty={10}/>
                            </div>
                        </article>

                        <article id="water-obelisk-card" className="card">
                            <label className="check-container bottom-border">
                                <input 
                                    type="checkbox" 
                                    id={"water-obelisk-checkbox"} 
                                    name={"water-obelisk"} 
                                    value={"Water Obelisk"} 
                                    /*checked={"isChecked"} 
                                    onChange={handleOnChange}*//>
                                    Water Obelisk
                            </label>
                            <div className="pt-3">
                                <IconLink label="500,000g" altImgSrc="Gold" isLink={false}/>
                                <IconLink category="Resource" label="Iridium Bar" qty={10}/>
                                <IconLink category="Fish" label="Clam" qty={10}/>
                                <IconLink category="Fish" label="Coral" qty={10}/>
                            </div>
                        </article>

                        <article id="desert-obelisk-card" className="card">
                            <label className="check-container bottom-border">
                                <input 
                                    type="checkbox" 
                                    id={"desert-obelisk-checkbox"} 
                                    name={"desert-obelisk"} 
                                    value={"Desert Obelisk"} 
                                    /*checked={"isChecked"} 
                                    onChange={handleOnChange}*/ />
                                    Desert Obelisk
                            </label>
                            <div className="pt-3">
                                <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
                                <IconLink category="Resource" label="Iridium Bar" qty={20}/>
                                <IconLink category="Fruit" label="Coconut" qty={10}/>
                                <IconLink category="Fruit" label="Cactus Fruit" qty={10}/>
                            </div>
                        </article>

                        <article id="desert-obelisk-card" className="card">
                            <label className="check-container bottom-border">
                                <input 
                                    type="checkbox" 
                                    id={"desert-obelisk-checkbox"} 
                                    name={"desert-obelisk"} 
                                    value={"Desert Obelisk"} 
                                    /*checked={"isChecked"} 
                                    onChange={handleOnChange}*/ />
                                    Desert Obelisk
                            </label>
                            <div className="pt-3">
                                <IconLink label="1,000,000g" altImgSrc="Gold" isLink={false}/>
                                <IconLink category="Resource" label="Iridium Bar" qty={20}/>
                                <IconLink category="Fruit" label="Coconut" qty={10}/>
                                <IconLink category="Fruit" label="Cactus Fruit" qty={10}/>
                            </div>
                        </article>


                    </div>

                </section>


            </div>
        </main>
    );
}