<script setup lang="ts">
  import { ref } from "vue";
  import BaseCard from "@/components/BaseCard.vue";
  const tab = ref(1);

</script>
  
  <template>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center px-6 py-4 position-relative">
        <p class="text-h6 font-weight-bold">관세사 보험 약관</p>
        <v-spacer />
      </v-card-title>
      <v-divider class="mb-0"/>
      <v-card-text class="px-10 pt-0 pb-6">
        <div class="mt-4">
          <v-tabs  v-model="tab" color="primary" density="comfortable">
            <v-tab value="1" class="flex-grow-1">원문</v-tab>
            <v-tab value="2" class="flex-grow-1">번역문</v-tab>
          </v-tabs>  
          <v-window v-model="tab" class="pa-6 border-top-lightgray-1">
            <!-- 가입정보 Tab 시작 -->
            <v-window-item value="1">
              <div class="terms-wrap-v2">
                <p class="title">Professional Liability Insurance Policy (Claims Made Basis)</p>
                <ul class="list-style-type-none">
                    <li>PREAMBLE
                        <ul class="list-style-type-none">
                            <li>Whereas the person or persons, partnership, firm or company named in the Schedule (hereinafter referred to as "the Insured") have made to "the Company" a written proposal bearing the date stated in the Schedule and containing particulars and statements which, together with any other information which may have been supplied, shall be the basis of this contract and shall be considered as incorporated herein, and in consideration of the premium stated in the Schedule.</li>
                        </ul>
                    </li>
                    <li>INDEMNITY CLAUSE
                        <ul class="list-style-type-none">
                            <li>The Company agrees, subject to the terms, limitations, exclusions and conditions of this Policy, to indemnify the Insured against all sums which the Insured shall become legally  liable to pay as damages and claimants' costs and expenses as a result of any claim or claims made against the Insured during the Period of Insurance stated in the Schedule rising out of any negligent act, error or omission on the part of,
                                <ol>
                                    <li>the Insured</li>
                                    <li>any employee or Director of the Insured, or</li>
                                    <li>any other person, persons, partnership, firm or company acting for or on behalf of the Insured,</li>
                                </ol>
                            </li>
                            <li>in or about the conduct of the Insured's business as specified in the Schedule.</li>
                            <li>This coverage applies only if any negligent act, error or omission of the insured was not first committed before the Retroactive Date shown in the Schedule or after the end of the policy period.</li>
                        </ul>
                    </li>
                    <li>COSTS AND EXPENSES
                        <ul class="list-style-type-none">
                            <li>The Company also agrees to pay all costs and expenses incurred in the investigation, defense or settlement of any claim which falls to be dealt with under this Policy.</li>
                        </ul>
                    </li>
                    <li>LIMIT OF THE COMPANY'S LIABILITY
                        <ul class="list-style-type-none">
                            <li>Provided always that the Company's total aggregate liability under this Policy  shall  not exceed the Limit of Indemnity specified in the Schedule in respect of all claims (which for the purpose of this clause shall be deemed to include all costs and expenses incurred in the investigation, defense or settlement of all claims) made against the Insured during any one Period of Insurance.</li>
                        </ul>
                    </li>
                    <li>EXCESS CLAUSE
                        <ul class="list-style-type-none">
                            <li>Provided further that the Company shall only be liable for that part of each and every claim (which for the purpose of this clause shall be deemed to include all costs and expenses incurred in the investigation, defense or settlement of any claim) which exceeds the amount of the Excess stated in the Schedule.</li>
                            <li>For the purpose of this clause "claim" shall mean all claims attributable to or arising out of the same cause or event.</li>
                            <li>If any expenditure is incurred by the Company which by virtue of this clause is the responsibility of the Insured then such amount shall be reimbursed to the Company by the Insured forthwith.</li>
                        </ul>
                    </li>
                    <li>LEGAL PERSONAL REPRESENTATIVES
                        <ul class="list-style-type-none">
                            <li>In the event of the death of any Insured the Company will, in respect of the liability incurred by the Insured, indemnify the Insured's legal personal representatives in the terms of this  Policy provided that such legal personal representatives shall, as though they were the Insured, observe, fulfill and be subject to the terms, conditions and exclusions of this Policy insofar as they can apply.</li>
                        </ul>
                    </li>
                    <li>INDEMNITY TO DIRECTORS AND EMPLOYEES
                        <ul class="list-style-type-none">
                            <li>If the Insured so requires, the Company will Indemnify any Director or employee of the Insured in like manner to the Insured, provided always that all such persons shall, as though they were the Insured, observe, fulfill and be subject to the terms, conditions, and exclusions of this Policy.</li>
                        </ul>
                    </li>
                    <li>EXTENDED REPORTING PERIOD
                        <ul class="list-style-type-none">
                            <li>If the policy is cancelled or not renewed by the company for reasons other than the Named Insured's non-payment of premium or deductible amount, or non-compliance with the terms and conditions of this policy, a claim first made during the Extended Reporting Period stated in the Schedule will be deemed to have been made on the last day of the policy period, provided that the claim has been arising from any negligent act or error or omission in professional services rendered subsequent to the Retroactive Date and prior to the expiration or cancellation date.</li>
                            <li>The Claims Extended Reporting Period does not extend the policy or change the scope of coverage provided. The claims extension period does not reinstate or increase the Limit of Liability Provided by this policy.</li>
                        </ul>
                    </li>
                </ul>
                <p class="title">CONDITIONS</p>
                <ul class="list-style-type-none">
                    <li>CLAIMS NOTIFICATION
                        <ul class="list-style-type-none">
                            <li>The Insured shall as a condition precedent to any right to be indemnified under this Policy give to the Company immediate notice in writing,
                                <ol>
                                    <li>of any claim made against them, or</li>
                                    <li>of receipt of notice of an intention to hold the Insured responsible for any matter could result in a claim under this Policy,</li>
                                </ol>
                            </li>
                            <li>and shall in both cases give to the Company such information as the Company may reasonably require.</li>
                        </ul>
                    </li>
                    <li>CLAIMS HANDLING
                        <ul class="list-style-type-none">
                            <li>The Insured as a condition precedent to their right to be indemnified under this Policy shall not admit liability for or settle any claim or incur any costs or expenses in connection therewith without the written consent of the Company who shall be entitled  to take over and conduct in the name of the Insured the defense or settlement of any claim.</li>
                            <li>The Insured shall not be required to contest any legal proceedings unless a Counsel to be mutually agreed upon by the Insured and the Company shall advise that such  proceedings should be contested.</li>
                            <li>The Insured shall be entitled at their own risk to contest any claim or legal proceedings which in the opinion of the Company should be compromised</li>
                            <li>or settled provided that the Company shall not be liable for any damages, costs or expenses incurred directly or indirectly as a result of the Insured's refusal to compromise or settle such claim or legal proceedings.</li>
                        </ul>
                    </li>
                    <li>WAIVER OF SUBROGATION AGAINST DIRECTORS OR EMPLOYEES
                        <ul class="list-style-type-none">
                            <li>If any payment is made under this Policy and the Company is thereupon subrogated to the Insured's rights of recovery in relation thereto, the Company agrees not to exercise any such rights against any director or employee of the Insured unless the claim is brought about or contributed to by the dishonest, fraudulent, criminal or malicious act or omission of the director or employee. The Insured shall give all such assistance in the exercise of rights of recovery as the Company may reasonably require.</li>
                        </ul>
                    </li>
                    <li>NOTIFICATION OF CIRCUMSTANCES
                        <ul class="list-style-type-none">
                            <li>If during the Period of Insurance the Insured shall become aware of any circumstance(s) or occurrence(s) which may subsequently give rise to a claim against them and shall during the Period of Insurance give immediate written notice to the Company of such circumstance(s) or occurrence(s) then any claim which is subsequently made against the Insured arising out of those circumstance(s) or occurrence(s) shall for the purposes of this Policy be deemed to have been made during the Period of Insurance.</li>
                        </ul>
                    </li>
                    <li>ADJUSTMENT OF PREMIUMS
                        <ul class="list-style-type-none">
                            <li>If the premium for this Policy has been calculated on any estimates furnished by the Insured, the Insured shall keep an accurate record containing all particulars relative  thereto and shall at all times allow the Company or their duly appointed representative to inspect such records. The Insured shall within one month from expiry of the Period of Insurance furnish such particulars and information as may require. The premium for   such period shall then be adjusted and the difference paid by or allowed to the Insured as the case may be, provided that the premium for any Period of Insurance shall not be less than the Minimum Premium stated in the Schedule.</li>
                        </ul>
                    </li>
                    <li>CANCELLATION
                        <ul class="list-style-type-none">
                            <li>This Policy may be cancelled by or on behalf of the Company by thirty days notice given in writing to the Insured and the premium hereon shall be adjusted in accordance with Condition 5, or if the premium has not been calculated on any estimates furnished by the Insured, on the basis of the Company receiving or retaining pro rata premium.</li>
                            <li>Notice shall be deemed to be duly received in the course of post if sent by pre-paid letter post properly addressed to the Insured's last known address.</li>
                        </ul>
                    </li>
                    <li>DUE OBSERVANCE
                        <ul class="list-style-type-none">
                            <li>The due observance of and compliance with the terms, provisions and conditions of this Policy insofar as they relate to anything to be done or complied with by the Insured, shall be conditions precedent to any liability oftheCompany</li>
                        </ul>
                    </li>
                    <li>FRAUDULENT CLAIMS
                        <ul class="list-style-type-none">
                            <li>If the Insured shall make any claim knowing the same to be false or fraudulent as regards amount, or otherwise, this Policy shall become void and all claims thereunder shall be forfeited.</li>
                        </ul>
                    </li>
                </ul>
                <p class="title">EXCLUSIONS</p>
                <span class="subtitle">The Company shall not be liable to indemnify the Insured against any claim,</span>
                <ul class="list-style-type-none">
                    <li>EMPLOYERS LIABILITY
                        <ul class="list-style-type-none">
                            <li>(ａ) arising directly or indirectly from bodily injury, sickness, disease or death sustained by any person arising out of and in the course of his/her employment by the Insured under any contract of service or apprenticeship, or for any breach of any obligation owed by the Insured as an employer to any employee.</li>
                        </ul>
                    </li>
                    <li>LAND, BUILDINGS ETC.
                        <ul class="list-style-type-none">
                            <li>(ｂ) arising directly or indirectly from the ownership, possession or use by or on behalf of the Insured of any land, buildings, aircraft, watercraft, vessel or mechanically propelled vehicle.</li>
                        </ul>
                    </li>
                    <li>DISHONESTY
                        <ul class="list-style-type-none">
                            <li>(ｃ) arising directly or indirectly from any dishonest, fraudulent, malicious or illegal act or omission of the Insured,</li>
                        </ul>
                    </li>
                    <li>DEFAMATION
                        <ul class="list-style-type-none">
                            <li>(ｄ)	alleging libel or slander,</li>
                        </ul>
                    </li>
                    <li>INFRINGEMENT
                        <ul class="list-style-type-none">
                            <li>(ｅ) alleging infringement of Copyright, Patents, Registered Designs, Trade Marks or Passing-off,</li>
                        </ul>
                    </li>
                    <li>CONTRACTUAL LIABILITY
                        <ul class="list-style-type-none">
                            <li>(ｆ) arising directly or indirectly from any liability assumed by the Insured under any express warranty, agreement or guarantee unless such liability would have attached to the Insured notwithstanding such express warranty, agreement or guarantee.</li>
                        </ul>
                    </li>
                    <li>PRODUCTS
                        <ul class="list-style-type-none">
                            <li>(ｇ) arising out of or relating to goods or products, sold, supplied, repaired, altered, manufactured, installed or maintained by the Insured or any related Company or by sub-contractors of the Insured.</li>
                        </ul>
                    </li>
                    <li>BODILY INJURY/PROPERTY DAMAGE
                        <ul class="list-style-type-none">
                            <li>(ｈ) for bodily injury, sickness, disease or death sustained by any person or any loss, damage or destruction of property unless such claim emanates from negligent advice, design, specification, formula or a breach of duty owed in a professional capacity by the Insured.</li>
                        </ul>
                    </li>
                    <li>INSOLVENCY/BANKRUPTCY OF ASSURED
                        <ul class="list-style-type-none">
                            <li>(ｉ) arising out of or relating directly or indirectly from the insolvency or bankruptcy of the Insured,</li>
                        </ul>
                    </li>
                    <li>SEEPAGE & POLLUTION
                        <ul class="list-style-type-none">
                            <li>(ｊ) based upon, arising out of or relating directly or indirectly from or in consequence of or  in any way involving, seepage, pollution or contamination of any kind,</li>
                        </ul>
                    </li>
                    <li>OTHER INSURANCE
                        <ul class="list-style-type-none">
                            <li>(ｋ) in respect of which the Insured are entitled to indemnity under any other  insurance  except in respect of any excess beyond the amount which is payable under such other insurance.</li>
                        </ul>
                    </li>
                    <li>CIRCUMSTANCES KNOWN AT INCEPTION
                        <ul class="list-style-type-none">
                            <li>(ｌ)  arising out of any circumstance(s) or occurrence(s) of which the Insured is or are aware, or ought reasonably to be aware, at inception of this Policy, whether notified under any other insurance or not,</li>
                        </ul>
                    </li>
                    <li>RADIOACTIVE CONTAMINATION & EXPLOSIVE NUCLEAR ASSEMBLIES
                        <ul class="list-style-type-none">
                            <li>(ｍ)	directly or indirectly caused by or contributed to by or arising from
                                <ol class="list-style-type-lower-roman">
                                    <li>ionizing radiations or contamination by radioactivity from any nuclear fuel or from any nuclear waste from the combustion of nuclear fuel.</li>
                                    <li>the radioactive, toxic, explosive or other hazardous properties of any explosive nuclear assembly or nuclear component thereof,</li>
                                </ol>
                            </li>
                        </ul>
                    </li>
                    <li>LEGAL ACTION
                        <ul class="list-style-type-none">
                            <li>(ｎ) where action for damages is brought in a court of law outside the territories specified in the Schedule, or where action is brought in a court law within those territories to enforce  a foreign judgment whether by way of Reciprocal Agreement or otherwise.</li>
                        </ul>
                    </li>
                </ul>
                <ul class="list-style-type-none">
                  <li>
                    <p class="title">PUNITIVE DAMAGES EXCLUSION CLAUSE</p>
                      <ul class="list-style-type-none">
                          <li>This insurance does not cover any liability for fines, penalties, punitive or exemplary damages.</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">NUCLEAR ENERGY LIABILITY EXCLUSION CLAUSE</p>
                      <ul class="list-style-type-none">
                          <li>It is hereby understood and agreed that this policy shall not apply to any accident or occurrence resulting from the hazardous properties of nuclear material if such accident or occurrence arises out of the ownership, use of operations by the insured of any nuclear facility other than the use of radioactive isotopes. For the purpose of this endorsement :</li>
                          <li>"Nuclear material", means source material, special nuclear material or by-product material,</li>
                          <li>"Source material", "special nuclear material", "By-product material" have the meanings given them in the Republic of Korea atomic energy act or in any law amendatory thereof ; "Spent fuel" means any fuel element or fuel component, solid or liquid, which has been used or exposed to radiation in a nuclear reactor ;</li>
                          <li>"Waste" means any waste material (1) Containing by-product material and (2) resulting from the operation by any person or organization of any nuclear facility included within the definition of nuclear facility under paragraph (A) or (B) thereof :</li>
                          <li>"Radioactive isotope" means any by-product material except such material (1) contained in spend   fuel or waste, or (2) discharged or dispersed from any nuclear facility ;</li>
                          <li>"Nuclear Facility" means :
                              <ul class="list-style-type-none">
                                  <li>(A)	Any Nuclear Reactor :</li>
                                  <li>(B)	Any equipment or device designed or used for (1) separating, the isotopes or uranium or plutonium, (2) processing or utilizing spent fuel, of (3) handling, processing or packaging waste.</li>
                                  <li>(C)	Any equipment or device used for the processing, fabricating or alloying or special nuclear material if at any time the total amount of such material in the custody of the insured at the premises where such equipment or device is located consists of or contains more than 25 grams of plutonium or uranium 233 or any combination thereof, or more than 250grams of uranium 235 :</li>
                                  <li>(D)	Any structure, basin, excavation, premises or place prepared or used for the storage or disposal of waste.</li>
                              </ul>
                          </li>
                          <li>And includes the site on which any of the foregoing is located, all operations conducted on such site and all premises used for such operations :</li>
                          <li>"Nuclear Reactor" means any apparatus designed or used to sustain nuclear fission in a self-supporting chain reaction or to contain a critical mass fissionable material :</li>
                          <li>"Hazardous Properties : includes radioactive, toxic or explosive properties ; with respect to injury to or destruction of property, the word "Injury" or "Destruction" includes all forms of radioactive contamination of property.</li>
                      </ul>        
                  </li>
                  <li>
                    <p class="title">MILLENNIUM(Y2K) EXCLUSION CLAUSE</p>
                      <ul class="list-style-type-none">
                          <li>It is agreed and understood that otherwise subject to the terms, exclusions, provisions and conditions contained in the Policy or endorsed thereon, the following shall apply to this insurance :
                              <ul class="list-style-type-none">
                                  <li>A.	Insurer(s) will not pay for Damage or Consequential Loss directly or indirectly caused by, consisting of, or arising from, the failure of any computer, data processing equipment or media, microchip, operating systems, microprocessors(computer chip), integrated circuit or similar device, any computer software, or any other products, and any services, data or functions that directly or indirectly use or rely upon, in any manner, any of the items listed above, whether the property of the insured or not, that results from any actual or alleged failure, malfunction or inadequacy due to inability to correctly recognize, process, distinguish, interpret or accept any date as its true calendar date.</li>
                                  <li>B.	It is further understood that we will not pay for the repair of modification of any part of an electronic data processing system or its related equipment, to correct deficiencies or features of logic or operation.</li>
                                  <li>C.	It is further understood that we will not pay for Damage or Consequential Loss arising from the failure, inadequacy or malfunction of any advice, consultation, design evaluation, inspection installation, maintenance, repair or supervision provided or done by Insured or for Insured to determine, rectify or test, any potential or actual failure, malfunction or inadequacy described in A. above.</li>
                              </ul>
                          </li>
                          <li>Such damage or Consequential Loss described in A, B, or C above, is excluded regardless or any other cause that contributed concurrently or in any other sequence.</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">ASBESTOS EXCLUSION CLAUSE</p>
                      <ul class="list-style-type-none">
                          <li>This policy does not apply to:-</li>
                          <li>Liability arising from the manufacture, distribution, sale, installation, removal, use, ingestion, inhalation and/or exposure to asbestos or products containing asbestos including liability resulting from asbestosis or any related disease (Asbestos/Asbestosis)</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">SANCTION LIMITATION AND EXCLUSION CLAUSE</p>
                      <ul class="list-style-type-none">
                          <li>No insurer shall be deemed to provide cover and no insurer shall be liable to pay any claim or provide any benefit hereunder to the extent that the provision of such cover, payment of such claim or provision of such benefit would expose that insurer to any sanction, prohibition or restriction under United Nations resolutions or the trade or economic sanctions, laws or regulations of the European Union, United Kingdom or United States of America.</li>
                      </ul>    
                  </li>
                  <li>
                    <p class="title">CONSEQUENTIAL LOSS EXCLUSION</p>
                      <ul class="list-style-type-none">
                          <li>This policy shall not provide coverage for losses such as loss of profits, loss of revenue, loss of production, loss of business opportunity, loss of data, and loss of anticipated savings of benefits.</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">CONTRACTUAL LIABILITY EXCLUSION</p>
                      <ul class="list-style-type-none">
                          <li>This insurance does not apply to claims for which the insured is obligated to pay loss by reason of the assumption of liability in a contract or agreement. This exclusion does not apply to liability for loss(es)
                              <ul class="list-style-type-none">
                                  <li>(1)	Assumed in a contact or agreement that is an “insured contract” or</li>
                                  <li>(2)	That the insured would have in the absence of the contract or agreement</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">WAR AND TERRORISM EXCLUSION</p>
                      <ul class="list-style-type-none">
                          <li>Notwithstanding any provision to the contrary within this insurance or any endorsement thereto it is agreed that this insurance excludes loss, damage, cost or expense of whatsoever	nature directly or indirectly caused by, resulting from or in connection with any of the following regardless of any other cause or event contributing concurrently or in any other sequence to the loss;
                              <ul class="list-style-type-none">
                                  <li>(1)	war, invasion, acts of foreign enemies, hostilities or warlike operations (whether war be declared or not), civil war, rebellion, revolution, insurrection, civil commotion assuming the proportions of or amounting to an uprising, military or usurped power; or</li>
                                  <li>(2)	any act of terrorism. For the purpose of this endorsement an act of terrorism means an act, including but not limited to the use of force or violence and/or the threat thereof, of any person or group(s) of persons, whether acting alone or on behalf of or in connection with any organization(s) or government(s), committed for political, religious, ideological or similar purposes including the intention to influence any government and/or to put the public, or any section the public, in fear.</li>
                              </ul>
                          </li>
                          <li>This endorsement also excludes loss, damage, cost or expense of whatsoever mature directly or indirectly caused by, resulting from or in connection with any action taken in controlling, preventing, suppressing or in any way relating to (1) and/or (2) above.</li>
                          <li>If the Underwriters allege that by reason of this exclusion, any loss, damage, cost or expense is not covered by this insurance the burden of proving the contrary shall be upon the Assured</li>
                          <li>In the event any portion of this endorsement is found to be invalid or unenforceable, the remainder shall remain in full force and effect.</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">CRIMINAL DEFENSE COSTS COVERAGE ENDORSEMENT</p>
                      <ul class="list-style-type-none">
                          <li>In consideration of the premium charged, it is hereby understood and agreed that the</li>
                          <li>insurer shall cover the insureds’ defense costs including lawyer fees for the amount maximum of	per each claim in case imprisoned under warrant of arrest due to bodily injury to third party arising out of the insured’s errors & omissions in rendering or failure to render professional services as declared during the policy period in Korea.</li>
                          <li>All other terms and conditions of the policy shall remain unaltered</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">CLAIMS CO-OPERATION CLAUSE</p>
                      <ul class="list-style-type-none">
                          <li>Notwithstanding anything contained in this Reinsurance to the contrary, it is a condition to any liability under this Reinsurance that:
                              <ul class="list-style-type-none">
                                  <li>a)	The Reinsured shall, upon knowledge of any circumstances which may give rise to a claim against this Reinsurance, advise the Reinsurers thereof as soon as reasonably practicable.</li>
                                  <li>b)	The Reinsured shall furnish Reinsurers with all information respecting any claim or claims;</li>
                                  <li>c)	The Leading Reinsurer shall have the right to appoint adjusters and/or representatives acting on their behalf to control all negotiations, adjustments and settlements in connection with such claim or claims.</li>
                                  <li>d)	No settlement and/or compromise shall be made and no liability admitted without the prior agreement of Leading Reinsurer. All ex-gratia requests to be referred to the Leading reinsurer for agreement irrespective of amount.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Cross Liability Clause</p>
                      <ul class="list-style-type-none">
                          <li>It is hereby declared and agreed that in event of an occurrence to one or more Insured for which another Insured is or may be held liable, then this Policy shall cover such Insured against whom claim is made or may be made in the same manner as if separate Policies had been issued to each Insured. The inclusion of more than one Insured hereunder shall not serve to increase the limit(s) of liability under the Policy.</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Financial Advisors or Investment Counselors Exclusion</p>
                      <ul class="list-style-type-none">
                          <li>This policy shall not provide coverage for losses caused by any financial advice or investment counseling of the insured.</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Non-professional service exclusion Clause(caregivers)</p>
                      <ul class="list-style-type-none">
                          <li>The company shall not provide coverage for losses as follow ;
                              <ul class="list-style-type-none">
                                  <li>-	Loss caused by medical treatment of the insured</li>
                                  <li>-	Libel, slander, breach of secrecy</li>
                                  <li>-	Loss, theft of the patient’s belongings</li>
                                  <li>-	Loss caused by the insured’s corruption, fraud, crimes or any activities performed under the influence of alcohol or drugs.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Non-professional service exclusion Clause(Nurse)</p>
                      <ul class="list-style-type-none">
                          <li>The company shall not provide coverage for losses as follow ;
                              <ul class="list-style-type-none">
                                  <li>-	loss of money, property damages caused by the insured’s financial activities on behalf of the third party.</li>
                                  <li>-	loss caused by the insured’s non- professional activities as nurse</li>
                                  <li>-	loss caused by the insured’s gambling, frauds.</li>
                                  <li>-	loss of assault, libel & slander</li>
                                  <li>-	loss of infections</li>
                                  <li>-	loss caused by the insured’s medical services</li>
                                  <li>-	loss caused by any warranties of the insured</li>
                                  <li>-	loss to families of the insured</li>
                                  <li>-	loss caused by the insured’s medical assistant activities not instructed by doctors</li>
                                  <li>-	loss caused by the insured’s activities for the purpose of beauty.</li>
                                  <li>-	loss caused by the insured’s corruption, fraud, crimes or any activities performed under the influence of alcohol or drugs.</li>
                                  <li>-	loss caused by performing special medical treatment not confirmed by the authorities.</li>
                                  <li>-	loss caused by food poisoning</li>
                                  <li>-	loss caused by property damage to medical machines</li>
                                  <li>-	loss caused by property damage to belongings of the patients.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Non-professional service exclusion Clause</p>
                      <ul class="list-style-type-none">
                          <li>The company shall not provide coverage for losses as follow ;
                              <ul class="list-style-type-none">
                                  <li>-	loss of money, property damages caused by the insured’s financial activities on behalf of the third party.</li>
                                  <li>-	loss caused by the insured’s non- professional activities.</li>
                                  <li>-	loss caused by the insured’s gambling, frauds.</li>
                                  <li>-	loss of assault, libel & slander</li>
                                  <li>-	loss of infections</li>
                                  <li>-	loss caused by the insured’s medical services</li>
                                  <li>-	loss caused by any warranties of the insured</li>
                                  <li>-	loss to families of the insured</li>
                                  <li>-	loss caused by the insured’s medical assistant activities not instructed by doctors</li>
                                  <li>-	loss caused by the insured’s activities for the purpose of beauty.</li>
                                  <li>-	loss caused by the insured’s corruption, fraud, crimes or any activities performed under the influence of alcohol or drugs.</li>
                                  <li>-	loss caused by performing special medical treatment not confirmed by the authorities.</li>
                                  <li>-	loss caused by food poisoning</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Non-professional service exclusion Clause(Caddies)</p>
                      <ul class="list-style-type-none">
                          <li>The company shall not provide coverage for losses as follow ;
                              <ul class="list-style-type-none">
                                  <li>-	loss caused by the insured’s non- professional activities.</li>
                                  <li>-	loss caused by libel, slander, breach of secrecy</li>
                                  <li>-	loss caused by the insured’s corruption, fraud, crimes or any activities performed under the influence of alcohol or drugs.</li>
                                  <li>-	This Policy Should not cover any bodily injury of the party DIRECTLY caused by the insured</li>
                                  <li>-	loss of assault, libel & slander</li>
                                  <li>-	damage to cart itself</li>
                                  <li>-	personal accident risk of the caddies</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Non-professional service exclusion Clause(Medical agents)</p>
                      <ul class="list-style-type-none">
                          <li>The company shall not provide coverage for losses as follow ;
                              <ul class="list-style-type-none">
                                  <li>-	loss of money, property damages caused by the insured’s financial activities on behalf of the third party.</li>
                                  <li>-	loss caused by the insured’s non- professional activities.</li>
                                  <li>-	loss caused by the insured’s gambling, frauds.</li>
                                  <li>-	loss of assault, libel & slander</li>
                                  <li>-	loss of infections</li>
                                  <li>-	loss caused by performing out of guideline of Medical Agents issued by Ministry of Health</li>
                                  <li>-	loss caused by performing out of guideline of Medical Agents regulated by the relevant law.</li>
                                  <li>-	loss caused by the insured’s medical services</li>
                                  <li>-	loss caused by any warranties of the insured</li>
                                  <li>-	loss to families of the insured</li>
                                  <li>-	loss caused by the insured’s medical assistant activities not instructed by doctors</li>
                                  <li>-	loss caused by the insured’s activities for the purpose of beauty.</li>
                                  <li>-	loss caused by the insured’s corruption, fraud, crimes or any activities performed under the influence of alcohol or drugs.</li>
                                  <li>-	loss caused by performing special medical treatment not confirmed by the authorities.</li>
                                  <li>-	loss caused by food poisoning</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Scope of Coverage for Tax Accountants</p>
                      <ul class="list-style-type-none">
                          <li>-	Loss expected or intended from the standpoint of the Insured excluded</li>
                          <li>-	Loss arising out of activities beyond the scope of duties as tax accountants</li>
                          <li>-	Loss arising out of sales, advices, recommendations, solicitation, suggestion or opinions for any and all types of investment or any variation thereof excluded</li>
                          <li>-	Co-insurance of the insured: (refer to the attached schedule)</li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">TOTAL POLLUTION LIABILITY EXCLUSION CLAUSE</p>
                      <ul class="list-style-type-none">
                          <li>This Insurance does not cover any liability for ;
                              <ul class="list-style-type-none">
                                  <li>1.	Personal Injury or Bodily Injury or loss of, damage to or loss of use of property directly or indirectly caused by seepage, pollution and contamination.</li>
                                  <li>2.	The cost of removing, nullifying or cleaning-up seeping, polluting or contaminating substances.</li>
                                  <li>3.	Fines, penalties, punitive or exemplary damages.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li>
                    <p class="title">Waiver of Subrogation Clause</p>
                      <ul class="list-style-type-none">
                          <li>It is agreed and understood that otherwise subject to the terms exclusion, provisions and conditions contained in the policy or endorsed thereon, the company waives its right of subrogation against any assured and any person, firm or corporation having an association or affiliation, at the time of loss, with the assured through ownership, management or other interest, subject to having been insured under this policy.</li>
                      </ul>
                  </li>
              </ul>
              </div>
            </v-window-item>
            <v-window-item value="2">
              <div class="terms-wrap-v2">
                <p class="title">전문직업인배상책임보험 (번역문)</p>
                <p class="bg-lighterror border-radius-1 line-height-1-3 py-4 text-center text-error word-break-keep-all"><i class="mdi mdi-alert-circle-outline mr-2"></i>이 번역문은 보험계약의 이해를 돕기 위한 참고자료로서,<br/>동 번역문은 보험계약의 체결 및 동 보험계약의 보험조건 및 계약내용에는 영향을 미치지 아니합니다.</p>
                <ul class="list-style-type-none">
                    <li>일반조항
                        <ul class="list-style-type-none">
                            <li>스케줄의 기명 피보험자인 개인, 조합, 혹은 회사 (이하 "피보험자"라 칭함) 는 보험회 사 (이하 "회사"라 칭함)에 스케줄에 언급된 날짜의 서면의 설문서와 다른 정보를 제공 하며 동 자료는 보험계약의 기초가 되며 계약의 일부로 간주됩니다. 그리고 피보험자는 스케줄에 명기된 보험료를 납부함으로써 보험계약이 유효합니다.</li>            
                        </ul>
                    </li>
                    <li>보상조항
                      <ul class="list-style-type-none">
                        <li>
                            회사는 증권의 보험조건, 제한조건, 면책사항 및 일반조건을 전제로 스케줄에 언급된 피 보험자의 사업에 대하여 다음의 피보험자의 과실, 오기 및 탈루로 기인한 사고에 대해 보험기간 내에 피보험자에게 제기된 손해배상청구의 결과로 피보험자가 법률상의 배상책 임이 있는 경우 동 손해배상 청구에 대해 손해액 및 기타 비용을 보상합니다.
                            <ol>
                                <li>피보험자</li>
                                <li>피보험자의 임.직원</li>
                                <li>피보험자를 대리한 개인, 조합, 회사</li>
                            </ol>
                        </li>
                        <li>본 보험의 보장은 피보험자의 과실행위, 실수 또는 누락행위가 보험증권에 기재된 소급 담보일자 이전에 발생하지 않거나 또는 보험종기 이후에 발생하지 않은 경우에만 적용됩 니다.</li>
                      </ul>
                    </li>
                    <li> 비  용
                        <ul class="list-style-type-none">
                            <li>회사는 본 보험 증권에서 담보되는 사고를 조사, 방어, 합의하는데 발생한 비용도 보상 합니다.</li>
                        </ul>
                    </li>
                    <li>회사의 배상책임한도
                        <ul class="list-style-type-none">
                            <li>보상한도액은 보험기간 동안 피보험자에게 제기된 모든 손해배상청구에 대해 스 케줄에 언급된 보상한도액을 초과하지 아니합니다.(손해배상청구에 대한 조사, 방어, 합 의 비용포함)</li>
                        </ul>
                    </li>
                    <li>자기부담액
                        <ul class="list-style-type-none">
                            <li>회사는 손해배상청구의 조사, 방어 합의를 포함하여 각각의 손해배상청구에 대하여 스케 줄에 언급된 자기부담액을 초과하는 부분에 대해서만 보상책임을 집니다.<br/> 여기서 한 "손해배상청구"란 동일 사건 및 원인으로 야기된 모든 손해배상청구를 의미합니다.</li>
                            <li>만일 본 조항에 해당하는 비용을 회사가 부담할 경우 피보험자는 자기부담액을 회사에 납입하여야 합니다.</li>
                        </ul>
                    </li>
                    <li> 법적 대행인
                        <ul class="list-style-type-none">
                            <li>피보험자의 사망시 피보험자에 대한 손해 배상청구에 대하여 회사는 피보험자의 법적 대 행인에게 피보험자와 동일하게 증권의 보험조건, 일반조건, 면책조항을 적용하여 법적 대행인에게 보상합니다.</li>
                        </ul>
                    </li>
                    <li>피보험자의 임·직원 보상
                        <ul class="list-style-type-none">
                            <li>피보험자의 요구가 있을 시, 회사는 피보험자의 임 직원에게 피보험자에게와 동일하게 보상을 합니다. 다만 이 경우 동 임 직원에 대해 피보험자와 동일하게 증권상의 보험조 건, 일반조건 및 면책사항을 적용합니다.</li>
                        </ul>
                    </li>
                    <li>보고연장기간
                        <ul class="list-style-type-none">
                            <li>기명피보험자의 보험료 또는 공제금액의 미납, 보험약관조항의 미이행 사유를 제외하고 여타 다른 이유로 인해 보험계약이 보험회사에 의해 해지되거나 갱신되지 아니한 상황하 에, 만약 손해배상청구가 소급담보일자 이후, 보험종기 또는 해지일 이전에 행해진 전문 직업서비스상의 과실 또는 잘못으로 제기되었다면, 스케쥴에 명기된 보고연장기간내에 제기된 배상청구는 보험기간의 마지막날에 제기된 것으로 간주합니다.</li>
                            <li>손해 보고연장기간은 보험증서의 기한을 연장하거나 보장범위를 변경하는 것을 의미하지 는 않습니다. 손해 보고연장기간은 보험증권상의 제공된 보상한도액을 복원하거나 증액 시키지도 않습니다.</li>
                        </ul>
                    </li>     
                </ul>
                <p class="title">일반조항</p>
                <ul class="list-style-type-none">
                    <li>사고통지
                        <ul class="list-style-type-none">
                            <li>１. 피보험자는 동 보험증권하에서 보상받는 것에 우선하여, 다음사항에 대해 회사에 즉 각 서면통지를 하여야 합니다.
                                <ul class="list-style-type-none">
                                    <li>-	피보험자를 상대로 제기된 손해배상청구</li>
                                    <li>-	동 보험증권하에서 보상 가능한 피보험자의 책임에 관한 통지를 접수한 경우</li>
                                </ul>
                            </li>
                            <li>또한 상기의 경우 회사 요청에 따라 피보험자는 그에 관련한 정보를 제공하여야 합 니다.</li>
                        </ul>
                    </li>
                    <li>손해처리
                        <ul class="list-style-type-none">            
                            <li>２. 피보험자는 모든 손해 배상 청구에 대해 방어 혹은 청산할 권리를 갖는 회사의 서면 동의가 없는 경우에는 동 보험증권하에서 모든 손해배상청구와 관련하여 배상책임을 인정하거나 합의하거나 이에 관련하여 비용을 지불할 수 없습니다.</li>
                            <li>피보험자와 회사의 상호 동의로 선임한 변호사가 법률적 방어를 결정한 경우가 아니 면 피보험자는 법률적 진행으로 대응하여서는 아니됩니다.</li>
                            <li>회사의 합의, 보상 혹은 법률적 진행에 대해 피보험자가 거부하여 직.간접적으로 발 생한 손해 및 비용에 대해서 회사가 책임이 없는 경우, 피보험자는 회사가 합의 또 는 보상하는 것과 같이 해당 손해배상청구에 대항하거나 법률적 진행을 하는데 있어 피보험자의 위험으로 처리할 권리를 갖습니다.      </li>
                        </ul>
                    </li>
                    <li>피보험자 임·직원에 대한 대위권 포기
                        <ul class="list-style-type-none">
                            <li>３. 본 보험증권하에서 보험금이 지급되고 이에 따라 피보험자의 대위권을 회사가 계승 한 경우라도 피보험자 임직원의 부정, 사기, 범죄 또는 악의적 행위, 악의적 탈루로 인한 손해가 아닌 경우 피보험자의 임.직원에 대한 대위권 행사를 포기합니다. 피보험자는 회사가 합리적으로 요청한 경우 회사의 구상권 행사를 위해 모든 협조를 하여야 합니다.        </li>
                        </ul>
                    </li>
                    <li>통지사항
                        <ul class="list-style-type-none">
                            <li>４. 피보험자는 보험기간 동안 피보험자에 대해 손해배상청구가 예상되는 상황을 인지한 경우 즉시 그 상황에 대해 회사에 서면으로 통지하여야 하며 동 상황으로 손해배상 청구가 제기된 경우 동 통지는 본 보험상 보험기간 내에 행해진 것으로 간주됩니다.</li>
                        </ul>
                    </li>
                    <li>보험료 정산
                        <ul class="list-style-type-none">
                            <li>５. 본 보험의 보험료가 예상자료로 산출된 경우 피보험자는 정확한 보험료 산정 관련자 료를 보고하여야 하며, 회사나 회사의 대리인이 동 자료를 검토하고자 할 경우 언제 라도 이에 협조하여야 합니다. 피보험자는 회사가 요청할 경우 보험기간 만료후 한 달 이내에 동자료를 제공하여야 하며 회사가 산정한 보험료가 스케줄에 명기된 최소 보험료를 초과한 경우 초과분의 보험료를 회사에 납부하여야 합니다.</li>
                        </ul>
                    </li>
                    <li>보험의 해지
                        <ul class="list-style-type-none">
                            <li>６. 본보험은 회사가 피보험자에게 30일의 사전통지로 해지될 수 있으며 이 경우 일반조 항 5에 따라 보험료가 정산되며, 보험료가 예상자료로 산정된 경우가 아니면, 경과 보험료는 일할 계산방식으로 산정합니다. 이와 같은 통지가 피보험자의 최근 주소에 등기 우편으로 송부된 경우 피보험자가 정히 접수한 것으로 간주합니다.</li>
                        </ul>
                    </li>
                    <li>의무조항
                        <ul class="list-style-type-none">
                            <li>７. 피보험자가 준수하여야 하는 의무에 관한 보험증권상의 보험조건, 조항, 및 일반조 건은 회사의 배상책임에 우선하는 사항입니다..</li>
                        </ul>
                    </li>
                    <li>사기적 보험사고
                        <ul class="list-style-type-none">
                            <li>8. 보험금이나 기타 사고사항에 관련하여 오류 또는 사기에 대해 피보험자가 알고도 보 험사고로 처리한 경우 본보험은 무효이며, 이와 관련한 모든 손해배상청구는 실효됩 니다.</li>
                        </ul>
                    </li>
                </ul>
                <p class="title">면책사항</p>
                <span class="subtitle">회사는 다음으로 인한 손해배상청구에 대해서는 담보하지 아니합니다.</span>
                <ul class="list-style-type-none">
                    <li>사용자 배상책임
                        <ul class="list-style-type-none">
                            <li>(ａ) 피보험자가 고용인으로서 피고용인에 대해 부담하게 되는 계약사항 또는 의무의 위 반으로 인해 고용관계에 따라 야기된 상해, 사망, 질병에 직 간접적으로 기인한 손 해배상청구</li>
                        </ul>
                    </li>
                    <li>토지 건물등
                        <ul class="list-style-type-none">
                            <li>(ｂ) 피보험자에 의해 또는 대리하여 소유, 점유 또는 사용된 토지, 건물, 항공기, 선박 또는 동력운송시설로 야기된 손해배상청구</li>
                        </ul>
                    </li>
                    <li>부정행위
                        <ul class="list-style-type-none">
                            <li>(ｃ) 피보험자의 부정, 사기, 악의 또는 불법행위나 불법적 탈루로 인한 손해배상청구</li>
                        </ul>
                    </li>
                    <li>중	상
                        <ul class="list-style-type-none">
                            <li>(ｄ) 명백한 중상으로 인한 손해배상청구</li>
                        </ul>
                    </li>
                    <li>침	해
                        <ul class="list-style-type-none">
                            <li>(ｅ) 명백한 저작권, 특허권, 디자인, 상표권 등의 침해로 인한 손해배상청구 </li>
                        </ul>
                    </li>
                    <li>계약상의 배상책임
                        <ul class="list-style-type-none">
                            <li>(ｆ) 명시보증, 합의, 품질보증이 없었다면 피보험자가 배상책임을 지지 않을 명시보증, 합의, 품질보증으로 인해 피보험자에게 부과된 배상책임으로 인한 직 간접 손해배상청구</li>
                        </ul>
                    </li>
                    <li>생산물
                        <ul class="list-style-type-none">
                            <li>(ｇ) 피보험자나 피보험자 관련회사, 하청자에 의해 판매, 공급, 수리, 변형, 제작, 설 치 및 유지 보수되는 생산물에 관련한 또는 생산물로 인해 야기된 손해배상청구</li>
                        </ul>
                    </li>
                    <li>신체상해/재산손해
                        <ul class="list-style-type-none">
                            <li>(ｈ) 손해가 피보험자 전문 영역에 있어 태만한 자문, 디자인, 사양등 또는 전문영역 의 무위반으로 기인된 경우가 아니면 신체상해, 질병 사망 또는 재산손해로 야기된 손 해배상청구</li>
                        </ul>
                    </li>
                    <li>피보험자의 지불 불능/파산
                        <ul class="list-style-type-none">
                            <li>(ｉ) 피보험자의 지불 불능이나 파산에 직 간접적으로 기인한 손해배상청구</li>
                        </ul>
                    </li>
                    <li>오염사고
                        <ul class="list-style-type-none">
                            <li>(ｊ) 여하한 종류의 오염으로 인해 직 간접적으로 기인한 손해배상청구</li>
                        </ul>
                    </li>
                    <li>타보험
                        <ul class="list-style-type-none">
                            <li>(ｋ) 타보험에서 보상하는 금액을 초과한 부분을 제외하고 피보험자가 타보험에서 보상 받을 수 있는 경우의 손해 청구</li>
                        </ul>
                    </li>
                    <li>고지사항
                        <ul class="list-style-type-none">
                            <li>(ｌ) 타보험에 고지여부를 불문하고 보험가입시 피보험자가 알고 있었거나, 합리적으로 당연히 알고 있었어야 하는 상황으로 기인한 손해 청구</li>
                        </ul>
                    </li>
                    <li>방사능위험, 핵물질 폭발
                        <ul class="list-style-type-none">
                            <li>(ｍ) 다음으로 야기된 직 간접 손해배상
                                <ul class="list-style-type-none">
                                    <li>-	핵연료 또는 핵물질 연소에 따른 핵 폐기물로 인한 방사능 물질의 누출, 오염</li>
                                    <li>-	핵물질의 폭발로 인한 방사능, 독극물 및 이와 관련한 위험 물질</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>법률행위
                        <ul class="list-style-type-none">
                            <li>(ｎ) 스케줄에 명기된 국가이외의 법정에서 진행되는 법률행위나 또는 상호협정이나 이 와 유사한 상황으로 인해 그런 지역 내에서 외국의 판결을 실시할 경우</li>
                        </ul>
                    </li>
                </ul>
                <ul class="list-style-type-none">
                  <li><p class="title">벌과금 부담보 특별약관 [참고용 번역문]</p>
                      <ul class="list-style-type-none">
                          <li>이 보험은 벌금, 과료 또는 형벌이나 징계의 손해에 대한 배상책임을 담보하지 아니합니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">원자력배상책임 부담보 특별약관[참고용 번역문]</p>
                      <ul class="list-style-type-none">
                          <li>이 보험증권은 방사선 동위원소의 사용이외에 피보험자가 원자력시설을 소유하 거나 사용관리 중에 위험한 핵 물질에 의하여 발생하는 사고에 대해서는 적용하지 아니 합니다.</li>
                          <li>“핵물질”이란 본래의 핵물질, 특수핵물질 또는 부산물을 말합니다.</li>
                          <li>“본래의 핵물질, 특수물질, 부산물”이란 대한민국 원자력법의 정의 또는 이의 수정된 모든 법률에 규정한 의미를 말합니다.</li>
                          <li>“소모된 연료”는 고체 액체를 불문하고 핵원자로 속에서 방사선으로 사용되었거나 방 사선에 노출되어진 연료를 말합니다.</li>
                          <li>“폐물”이란 (1) 부산물을 포함하여 (2) 하기의 (A)란 및 (B)란의 원자력 시설의 정의 에 포함된 모든 원자력 시설을 개인이나 기관에 의해 운용될 때 생기는 폐기물을 말합니 다.</li>
                          <li>“방사성 동위원소”는 소모된 연료나 폐물 또는 원자력 시설로부터 방출되거나 소산된 물질을 제외한 부산물을 말합니다.</li>
                          <li>“원자력 시설”이란 다음을 말합니다.
                              <ul class="list-style-type-none">
                                  <li>(A) 모든 원자로</li>
                                  <li>(B) 하기의 목적으로 사용하는 장치나 설비</li>
                                  <li>(1) 동위원소나 우라늄 또는 플루토늄을 분리</li>
                                  <li>(2) 소모된 연료의 이용이나 가공처리</li>
                                  <li>(3) 폐물의 취급, 가공처리 및 포장</li>
                                  <li>(C) 특수한 핵물질을 가공처리하거나, 제조하거나, 혼합하는데 사용되어지는 장 치 및 설비. 단, 이러한 장치 및 설비는 이들이 소재하는 구내에서 피보험자 에 의해 관리되고 있는 특수한 핵물질의 총량이, 플루토늄 25 그램이나 우라 늄 233 또는 이들의 결합, 그리고 우라늄 235 가 250 그램 이상으로 구성되어 있거나 저장된 것을 말합니다.</li>
                                  <li>(D) 폐기물의 처분이나 저장을 위해 사용되거나 준비된 장소나 건물 및 구축물 , 웅덩이, 굴 그리고 위의 장치나 설비가 소재하고 있는 부지와, 이 부지위에 서 행해지는 모든 작업, 그리고 이러한 작업에 사용되어지는 모든 건물은 원자력 설비에 포합됩니다.</li>
                              </ul>
                          </li>
                          <li>“원자로”는 자체적인 연쇄반응으로 핵분열을 계속, 유지시키거나, 핵분열 시킬 수 있 는 위험한 물질을 저장하는데 사용되거나 고안된 기계 장치를 말합니다.</li>
                          <li>“위험한 재산”이란 방사성, 독성 또는 폭발성이 있는 물질을 말합니다.</li>
                          <li>재산의 손실 및 신체장해에 관련해서 신체장해나 손실이란 말은 재산의 모든 형태의 방 사능 오염을 포함합니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">서기 2000 년 부담보 추가약관[참고용 번역문]</p>
                      <ul class="list-style-type-none">
                          <li>제 1 조<br/>우리회사 (이하 「회사」라 합니다)는 보통약관 및 특별약관의 제조건 제규정에 불구하고, 피보험자의 소유여부에 관계없이 컴퓨터, 자료처리기기, 마이크로칩, 운영체제, 마이크 로프로세서, 집적회로 및 이와 유사한 장치, 컴퓨터 소프트웨어 또는 이들을 사용하거  나 이들과 관련된 생산물, 서비스, 자료, 기능에 있어 어떤 날짜를 정확한 달력날짜로 인식, 처리, 구별, 해석 혹은 받아들일 수 없음으로 인해 발생되는 모든 형태의 직접 또 는 간접손해를 보상하지 아니합니다.</li>
                      </ul>
                      <ul class="list-style-type-none">
                          <li>제 2 조<br/>회사는 위와 관련된 결함, 논리체계등을 교정하기 위한 정보처리시스템(EDPS)또는 그 관 련기기 일부분을 수리하거나 수정하는 비용은 보상하지 아니합니다.</li>
                      </ul>
                      <ul class="list-style-type-none">
                          <li>제 3 조<br/>회사는 상기 제 1 조에 기술한 것과 같은 날짜와 관련된 잠재적인 또는 실제적인 고장, 오작동, 부적합 등을 확인, 수정, 시험하기 위하여 피보험자가 자신이나 타인에게 행하 였거나 타인으로부터 받은 어떠한 조언, 지도, 설계의 평가, 설치의 검사, 유지관리, 수 리 또는 감독상의 오류, 부적절, 오작동으로 인하여 발생되는 손해와 결과적 손실을 보 상하지 아니합니다.</li>
                      </ul>
                      <ul class="list-style-type-none">
                          <li>제 4 조<br/>상기 제 1, 2, 3 조에 기술한 손해 또는 결과적 손실은 다른 사고원인과 병합 또는 관련 된 경우에도 보상하지 아니합니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">석면 부담보 특별약관</p>
                      <ul class="list-style-type-none">
                          <li>이 보험은 석면위험과 관련하여 아래와 같이 보상하지 아니합니다.</li>
                          <li>석면(석면관련 질병 포함)으로부터 야기되는 배상책임 손해를 포함하여, 석면 또는 석면제품과 관련하여 제조, 공급, 판매, 설치, 이동(제거), 사용, 섭취, 흡입, 석면 노출로부터 야기되는 손해를 보상하지 아니합니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">경제제재 조치 부보장 특별약관</p>
                      <ul class="list-style-type-none">
                          <li>회사가 손해를 보상하거나 보험금을 지급함으로써 국제연합(UN)의 결의안 또는 유럽연합(EU)∙영국∙미국의 법규에 의한 어떠한 무역제재, 경제 제재, 금지, 제한 조치를 위반하게 될 경우, 회사는 그와 같은 손해를 보상하거나 보험금을 지급하지 않습니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">간접손실 부담보 특별약관 [참고용 번역문]</p>
                      <ul class="list-style-type-none">
                          <li>본 보험에서는 이익손실, 수익손실, 생산성 손실, 사업기회손실, 자료의 손실, 기대수익 손실 등의 간접손실은 보장하여 드리지 않습니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">계약상 가중책임부담보 특별약관 [참고용 번역문]</p>
                      <ul class="list-style-type-none">
                          <li>본 보험에서는 피보험자가 체결한 계약이나 협정 등에 의해 부담하게 되는 배상책임은 보장하지 않습니다. 단, 해당 계약이나 협정에 대해 보험계약을 체결하거나, 해당 계약 이나 협정이 없어도 피보험자가 부담하게 되는 법률상 배상책임은 보장하여 드립니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">전쟁 및 테러위험 부담보 특별약관[참고용 번역문]</p>
                      <ul class="list-style-type-none">
                          <li>여타 보험조항에도 불구하고, 본 보험에서는 아래의 사실과 관련되어 직접, 간접적으로 발생하는 손실, 손해, 배상금, 비용 등 일체를 보장하여 드리지 않습니다.
                              <ul class="list-style-type-none">
                                  <li>(1) 회사는 전쟁, 침략행위, 외침, 악의적 파괴행위, 유사전쟁행위(선전포고의 유무 를 구별하지 않습니다.), 내전, 반란, 혁명, 시민폭동, 군정 등에 의하거나 이와 연관되어 직, 간접적으로 제기되는 모든 손실 및 손해 또는 손해배상청구에 대하 여 보상하지 않습니다.</li>
                                  <li>(2) 여타 행태의 테러행위. 여기에서 테러행위란 독자행동 또는 여타 조직, 정부를 대리 또는 관계하여 정치적, 종교적, 이데올로기적 또는 이와 유사한 행동을 통 해 정부, 대중, 공공분야에 영향을 미치려는 목적으로 수행하는 어떤 개인, 그룹 의 무력, 폭력의 사용 또는 위협하는 행위 등을 의미합니다.</li>
                              </ul>
                          </li>
                          <li>또한 본 특별약관은 위의 (1) 또는 (2)와 관련하여 이를 통제, 방어, 진압 등의 행위와 관련하여 직접, 간접적으로 발생한 손실, 배상, 비용 등을 보상하여 드리지 않습니다. 만일 보험사가 이 특별약관을 사유로 하여 면책임을 주장하는 경우, 부책사유임을 증명 할 입증책임은 피보험자에게 있습니다.</li>
                          <li>해당 특별약관이 타당하지 않거나, 적용되지 않는 경우에, 여타부분에 대한 보험사의 책 임은 변동이 없습니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">형사방어비용담보특별약관</p>
                      <ul class="list-style-type-none">
                          <li>회사는 이 특별약관에 따라 보험가입증서(보험증권)에 기재된 피보험자가 보험기간 중에 대한민국 내에서 수행하는 전문직업 서비스 제공행위와 관련하여 과실에 의한 사고로 인 하여 타인의 신체에 상해를 입힘으로써 구속영장에 의해 구속되었을 경우에는 변호사 보 수 등 방어비용으로 피보험자가 지출한 비용에 대하여 1 사고당 원을 한도로 하여 보 상하여 드립니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">손해처리협조특별약관</p>
                      <ul class="list-style-type-none">
                          <li>아래와 같은 사항은 이재보험하에 있는 어떠한 배상책임에도 선행하는 조건입니다. a)보험자에 대한 배상청구가 발생하는 어떠한 조건에 대하여 알고 있는 사항에 관해서는 출재자가 재보험자에게 지체없이 알려야합니다.
                              <ul class="list-style-type-none">
                                  <li>b)그출재자는 어떠한 배상청구에 관한 정보도 재보험자에게 알려야 합니다.</li>
                                  <li>c)재보험자는 배상청구와 관련하여 협상, 중재 또는 합의를 통제하기 위해 중재인 또는 대리인을 임명할 권리를 갖습니다.</li>
                                  <li>d)리딩재보험자의 사전동의없이는 어떠한 합의나 중재도 이뤄질 수 없으며 배상책임을 인정해서는 안됩니다. 리딩재보험자는 호혜지급요청에 대해 동의할 수 있습니다.</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">교차책임담보특별약관</p>
                      <ul class="list-style-type-none">
                          <li>어느 피보험자가 다른 피보험자에 대해 배상책임을 지게 되는 경우 이 보험증권은 각 피 보험자에게 별도증권이 발행된 것과 같은 방법으로 배상청구를 받는 피보험자를 담보하 는 것으로 합의합니다. 그러나, 복수의 피보험자를 담보한다고 해서 보상한도액을 초과 하여 보상하지 아니합니다.</li>
                      </ul>
                  </li>
                  <li><p class="title">비전문직업행위 등 부담보 특별약관(간병인용) </p>
                      <ul class="list-style-type-none">
                          <li>아래행위로 인해 발생한 손해는 보장하여 드리지 않습니다.
                              <ul class="list-style-type-none">
                                  <li>- 피보험자가 수행한 의료행위로 인한 배상책임 부담보</li>
                                  <li>- 피보험자의 업무수행 중 발생한 타인의 명예훼손 및 비밀누설 부담보</li>
                                  <li>- 피간병인 소유 또는 점유물의 분실, 도난에 기인한 배상책임 부담보</li>
                                  <li>- 피보험자의 사기, 부정 및 범죄행위 또는 피보험자의 음주상태나 약물복용상태에서의 업무수행 중 발생한 배상책임 부담보</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">비전문직업행위 등 부담보 특별약관(간호사용) </p>
                      <ul class="list-style-type-none">
                          <li>아래행위로 인해 발생한 손해는 보장하여 드리지 않습니다.
                              <ul class="list-style-type-none">
                                  <li>- 피보험자가 제3자의 금품을 대리하여 금융업무를 수행하던 중 발생한 금전 및 재물손해 사고에 기인한 배상책임 부담보</li>
                                  <li>- 피보험자가 간호사로서의 직접적인 업무 이 외의 행위 및 부작위로 인해 발생한 손해배상책임 부담보</li>
                                  <li>- 피보험자가 도박, 사행, 유흥 등 본연의 업무와 무관한 행위를 하던 중 발생한 사고에 기인한 배상책임 부담보</li>
                                  <li>- 피보험자의 폭행, 언어폭력 등에 의한 배상책임 부담보</li>
                                  <li>- 피보험자에 기인한 질병감염 등 상해사고 이외의 사고에 기인한 배상책임 부담보</li>
                                  <li>- 피보험자의 간호사로서의 업무에 대한 결과를 보증함으로써 가중된 배상책임 부담보</li>
                                  <li>- 피보험자의 친족에 입힌 손해에 대한 배상책임 부담보</li>
                                  <li>- 미용 또는 이에 준한 것을 목적으로 한 업무를 수행한 후 그 결과에 관하여 생긴 손해에 대한 배상책임 부담보</li>
                                  <li>- 피보험자의 부정, 사기, 범죄행위 또는 피보험자가 음주상태나 부정 약물복용</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">상태에서 업무를 수행함으로써 생긴 손해에 대한 배상책임 부담보</p>
                      <ul class="list-style-type-none">
                          <li>- 공인되지 아니한 특수의료 행위를 함으로써 생긴 손해에 대한 배상책임 부담보</li>
                          <li>- 식중독사고에 기인한 배상책임 부담보</li>
                          <li>- 피보험자에 의한 의료기기의 파손에 따른 손해배상책임 부담보</li>
                          <li>- 피보험자 간호 대상인 환자의 소유 물건에 발생하는 대물손해 부담보</li>
                      </ul>
                  </li>
                  <li><p class="title">비전문직업행위 등 부담보 특별약관 </p>
                      <ul class="list-style-type-none">
                          <li>아래행위로 인해 발생한 손해는 보장하여 드리지 않습니다.
                              <ul class="list-style-type-none">
                                  <li>- 피보험자가 제3자의 금품을 대리하여 금융업무를 수행하던 중 발생한 금전및 재물손해 사고에 기인한 배상책임 부담보</li>
                                  <li>- 피보험자가 전문인으로서의 직접적인 업무 이 외의 행위 및 부작위로 인해 발생한 손해 부담보</li>
                                  <li>- 피보험자가 도박, 사행, 유흥 등 본연의 업무와 무관한 행위를 하던 중 발생한 사고에 기인한 배상책임 부담보</li>
                                  <li>- 피보험자의 폭행, 언어폭력 등에 의한 배상책임 부담보</li>
                                  <li>- 피보험자에 기인한 질병감염 등 상해사고 이외의 사고에 기인한 배상책임부담보</li>
                                  <li>- 피보험자의 의료행위로 생긴 손해에 대한 배상책임 부담보</li>
                                  <li>- 피보험자의 돌봄(케어)결과를 보증함으로써 가중된 배상책임 부담보</li>
                                  <li>- 피보험자의 친족에 입힌 손해에 대한 배상책임 부담보</li>
                                  <li>- 의사의 지시에 따르지 아니한 피보험자의 의료보조행위로 생긴 손해에 대한 배상책임 부담보</li>
                                  <li>- 미용 또는 이에 준한 것을 목적으로 한 업무를 수행한 후 그 결과에 관하여 생긴 손해에 대한 배상책임 부담보</li>
                                  <li>- 피보험자의 부정, 사기, 범죄행위 또는 피보험자가 음주상태나 부정약물복용 상태에서 업무를 수행함으로써 생긴 손해에 대한 배상책임 부담보</li>
                                  <li>- 공인되지 아니한 특수의료 행위를 함으로써 생긴 손해에 대한 배상책임 부담보</li>
                                  <li>- 식중독사고에 기인한 배상책임 부담보</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">비전문직업행위 등 부담보 특별약관(캐디용) </p>
                      <ul class="list-style-type-none">
                          <li>아래행위로 인해 발생한 손해는 보장하여 드리지 않습니다.
                              <ul class="list-style-type-none">
                                  <li>- 피보험자가 전문인으로서의 직접적인 업무 이외의 행위 및 부작위로 인해 발생한 손해 부담보</li>
                                  <li>- 피보험자의 업무수행 중 발생한 타인의 명예훼손 및 비밀누설로 발생한 배상책임 부담보</li>
                                  <li>- 피보험자의 사기, 부정 및 범죄행위 또는 피보험자의 음주상태 나 약물복용상태에서의 업무수행 중 발생한 배상책임 부담보</li>
                                  <li>- 피보험자에 의한 직접적인 상해사고(고의사고)는 보상하지 아니합니다.</li>
                                  <li>- 피보험자의 폭행, 언어폭력 등에 의한 배상책임 부담보</li>
                                  <li>- 카트의 운행 또는 사용 중 발생한 사고로 인한 경우 카트의 손해 부담보</li>
                                  <li>- 캐디 본인의 상해위험 부담보</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">비전문직업행위 등 부담보 특별약관(보건진료원용)</p>
                      <ul class="list-style-type-none">
                          <li>아래행위로 인해 발생한 손해는 보장하여 드리지 않습니다.
                              <ul class="list-style-type-none">
                                  <li>1) 피보험자가 제3자의 금품을 대리하여 금융업무를 수행하던 중 발생한 금전 및 재물손해 사고에 기인한 배상책임</li>
                                  <li>2) 피보험자가 전문인으로서의 직접적인 업무 이 외의 행위 및 부작위로 인해 발생한 손해</li>
                                  <li>3) 피보험자가 도박, 사행, 유흥 등 본연의 업무와 무관한 행위를 하던 중 발생한 사고에 기인한 배상책임</li>
                                  <li>4) 피보험자의 폭행, 언어폭력 등에 의한 배상책임</li>
                                  <li>5) 피보험자에 기인한 질병감염 등 상해사고 이외의 사고에 기인한 배상책임</li>
                                  <li>6) 보건복지부발간 ‘보건진료원 환자진료지침’의 범위에 기재되지 않은 의료행위(수술 등)및 약품사용으로 인한 의료사고 부담보</li>
                                  <li>7) ‘농어촌등보건의료를위한특별조치법시행령’제 14조 ‘보건진료원의 업무’ 에 해당되지 않는 의료행위 부담보</li>
                                  <li>8) 피보험자의 돌봄(케어)결과를 보증함으로써 가중된 배상책임</li>
                                  <li>9) 피보험자의 친족에 입힌 손해에 대한 배상책임</li>
                                  <li>10) 미용 또는 이에 준한 것을 목적으로 한 업무를 수행한 후 그 결과에 관하여 생긴 손해에 대한 배상책임</li>
                                  <li>11) 피보험자의 부정, 사기, 범죄행위 또는 피보험자가 음주상태나 부정 약물복용 상태에서 업무를 수행함으로써 생긴 손해에 대한 배상책임</li>
                                  <li>12) 공인되지 아니한 특수의료 행위를 함으로써 생긴 손해에 대한 배상책임</li>
                                  <li>13) 식중독사고에 기인한 배상책임</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">담보범위 제한 특별약관(세무사용)</p>
                      <ul class="list-style-type-none">
                          <li>사고발생시 아래와 같은 조건으로 보상하여 드립니다.
                              <ul class="list-style-type-none">
                                  <li>- 통상 피보험자가 예측가능하거나 의도한 손실은 부담보]</li>
                                  <li>- 세무사의 의무범위를 초과하는 행위로 인한 손실은 부담보]</li>
                                  <li>- 여타 형태의 투자 및 이와 유사한 행위, 판매, 조언, 제언, 의견제시 등으로 인한 손실은 부담보</li>
                                  <li>- 자기부담(공동부담)비율 : 유첨 스케쥴 참조</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">오염부담보 특별약관</p>
                      <ul class="list-style-type-none">
                          <li>이 보험은 아래의 손해에 대하여 보상하지 않습니다.
                              <ul class="list-style-type-none">
                                  <li>(1) 직접 또는 간접적으로 오염물질의 누출, 오염 및 방사능 오염에 의해 야기된 인격침해 또는 신체상해나 재산손실이나 손해 및 그로 인한 사용손실로 인한 손해</li>
                                  <li>(2) 오염되거나 방사능에 누출된 물질을 제거하는 데 소요되는 비용손해</li>
                                  <li>(3) 벌금, 과태료 또는 징벌적 또는 배액배상0금으로 인한 손해</li>
                              </ul>
                          </li>
                      </ul>
                  </li>
                  <li><p class="title">대위권포기특별약관</p>
                      <ul class="list-style-type-none">
                          <li>이 증권과 그의 특별약관에 포함된 제조건, 제면책조항 및 제규정에 관계없이 우리회사 는 피보험자 또는 손해발생시의 피보험자가 소유, 관리 또는 기타 이해관계를 갖고 있으 며 이 보험에 가입한 개인이나 회사, 법인체의 경우 이들에 대한 대위권을 포기합니다.</li>
                      </ul>
                  </li>
              </ul>
              </div>
            </v-window-item>
          </v-window>
        </div>
      </v-card-text>
    </v-card>

  </template>
  
  