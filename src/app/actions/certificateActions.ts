"use server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createCertificate(formData: FormData) {
  const { error } = await supabaseAdmin.from('Certificate').insert({
    title: formData.get('title') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    url: formData.get('url') as string,
    imageUrl: formData.get('imageUrl') as string,
  });
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function updateCertificate(id: string, formData: FormData) {
  const newImageUrl = formData.get('imageUrl') as string;

  // Cleanup old image if changed/deleted
  const { data: oldCert } = await supabaseAdmin.from('Certificate').select('imageUrl').eq('id', id).single();
  if (oldCert?.imageUrl && oldCert.imageUrl !== newImageUrl) {
    const parts = oldCert.imageUrl.split('portfolio-assets/');
    const pathToRemove = parts.length > 1 ? parts[1] : null;
    if (pathToRemove) {
      await supabaseAdmin.storage.from('portfolio-assets').remove([pathToRemove]);
    }
  }

  const { error } = await supabaseAdmin.from('Certificate').update({
    title: formData.get('title') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    url: formData.get('url') as string,
    imageUrl: newImageUrl,
  }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function deleteCertificate(id: string) {
  // Cleanup image
  const { data: oldCert } = await supabaseAdmin.from('Certificate').select('imageUrl').eq('id', id).single();
  if (oldCert?.imageUrl) {
    const parts = oldCert.imageUrl.split('portfolio-assets/');
    const pathToRemove = parts.length > 1 ? parts[1] : null;
    if (pathToRemove) {
      await supabaseAdmin.storage.from('portfolio-assets').remove([pathToRemove]);
    }
  }

  const { error } = await supabaseAdmin.from('Certificate').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin-internal');
}
