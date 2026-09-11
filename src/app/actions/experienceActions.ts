"use server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createExperience(formData: FormData) {
  const { error } = await supabaseAdmin.from('Experience').insert({
    role: formData.get('role') as string,
    company: formData.get('company') as string,
    duration: formData.get('duration') as string,
    description: formData.get('description') as string,
    type: formData.get('type') as string,
  });
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function updateExperience(id: string, formData: FormData) {
  const { error } = await supabaseAdmin.from('Experience').update({
    role: formData.get('role') as string,
    company: formData.get('company') as string,
    duration: formData.get('duration') as string,
    description: formData.get('description') as string,
    type: formData.get('type') as string,
  }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function deleteExperience(id: string) {
  const { error } = await supabaseAdmin.from('Experience').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}
