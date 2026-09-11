"use server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createToolboxItem(formData: FormData) {
  const { error } = await supabaseAdmin.from('ToolboxItem').insert({
    name: formData.get('name') as string,
    categoryId: formData.get('categoryId') as string,
    iconUrl: formData.get('iconUrl') as string,
  });
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function updateToolboxItem(id: string, formData: FormData) {
  const newIconUrl = formData.get('iconUrl') as string;

  // Cleanup old image if changed/deleted
  const { data: oldItem } = await supabaseAdmin.from('ToolboxItem').select('iconUrl').eq('id', id).single();
  if (oldItem?.iconUrl && oldItem.iconUrl !== newIconUrl) {
    const parts = oldItem.iconUrl.split('portfolio-assets/');
    const pathToRemove = parts.length > 1 ? parts[1] : null;
    if (pathToRemove) {
      await supabaseAdmin.storage.from('portfolio-assets').remove([pathToRemove]);
    }
  }

  const { error } = await supabaseAdmin.from('ToolboxItem').update({
    name: formData.get('name') as string,
    categoryId: formData.get('categoryId') as string,
    iconUrl: newIconUrl,
  }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function deleteToolboxItem(id: string) {
  // Cleanup image
  const { data: oldItem } = await supabaseAdmin.from('ToolboxItem').select('iconUrl').eq('id', id).single();
  if (oldItem?.iconUrl) {
    const parts = oldItem.iconUrl.split('portfolio-assets/');
    const pathToRemove = parts.length > 1 ? parts[1] : null;
    if (pathToRemove) {
      await supabaseAdmin.storage.from('portfolio-assets').remove([pathToRemove]);
    }
  }

  const { error } = await supabaseAdmin.from('ToolboxItem').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}
